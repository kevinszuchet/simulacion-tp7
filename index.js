console.log("------------------ Inicio simulación ------------------");
console.log("Fijación de condiciones iniciales del modelo");
var T = 0, TPV = 0, TF = /*tiempo que queremos que corra*/,	
	SHTD = 0, // Variable de estado
	SFM = 0, 
	STO = 0, SF = 0, CPA = 0, SFPEF = 0, SFPTE = 0; // Variables para cálculos de resultados

// Recibe por parametro las variables de control
function simular(CC, CHT) {
	const TOPE_FACTURACION = 90000 * CC; // 90000 (por afip) por cada cuenta que tenga

	while(T < TF) {
		T = TPV;
		
		const IV = intevraloEntreVentas();
		TPV = T + IV;
		console.log("La próxima venta sera en:", IV);

		const MV = montoVenta();
		console.log("Monto de la próxima venta:", MV);

		reiniciarMes(); // TODO ver cuando usar

		if (SHTD < CHT) {
			if (SFM < TOPE_FACTURACION) {
				console.log("Atiendo un pedido");
				SHTD += 15; // Sumo 15 minutos
				SFM += MV; // Sumo el monto de la venta a la facturacion del mes
				CPA++; // Incremento un pedido atendido
				continue;
			}
		} else {
			console.log("Soy un workaholic");
			SFPTE += MV; // Sumo el monto de la venta a la facturación perdida por exceso de tiempo
			if (SFM < TOPE_FACTURACION)
				continue;
		}
		
		console.log("Me persigue la AFIP");
		SFPEF += MV; // Sumo el monto de la venta a la facturación perdida por exceso de $
	}

	console.log("Cálculo de resultados");
	calcularResultados();	
}

function intevraloEntreVentas() {

}

function montoVenta() {

}

function reiniciarMes() {

}

function calcularResultados() {
	const CHT = 0, // Cantidad de horas trabajadas
		CD = 0; // Cantidad de días trabajados

	console.log("Porcentaje de tiempo ocioso (PTO)", STO * 100 / CHT);
	console.log("Promedio de ganancia por hora (PGH)", SF / CHT);
	console.log("Porcentaje de ganancia en tiempo excedido (PGTE)", SFPTE * 100 / (SF + SFPTE));
	console.log("Promedio de pedidos atendidos por día (PPAD)", CPA / CD); // TODO revisar porque en la propuesta dice "incluyendo las ventas no contabilizadas"
	console.log("Porcentaje de ganancia pérdida por exceder facturación (PGPEF)", SFPEF * 100 / (SF + SFPEF));
}

simular(CC, CHT);
console.log("------------------ Fin simulación ------------------");
