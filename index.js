console.log("------------------ Inicio simulación ------------------");
console.log("Fijación de condiciones iniciales del modelo");
const TF = 525600; // Un año en minutos
var T = 0, TPV = 0,	
	SHTD = 0, // Variable de estado
	SFM = 0,
	cantidadDias = 0, cantidadMeses = 0, // Sirven para reiniciar la facutracion mensual
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

		reiniciarVariables();

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
	calcularResultados(CHT);
	console.log("------------------ Fin simulación ------------------");
}

function intevraloEntreVentas() {
	const R = Math.random();
	if (R <= 0) return intevraloEntreVentas();

	return 0.829556 * (((1 / R) - 1) ^ (1 / 208.49)); // A * (Raiz B de ((1 - R) / R))
}

function montoVenta() {
	const R = Math.random(), ln = Math.log;
	if (R <= 0.09 || R >= 0.99) return montoVenta();

	return -491.09 * ln((1 - R) / (R * Math.exp(2.935511))); // -Cte * ln(1 - R / R * e a la OtraCte)
}

function reiniciarVariables() {
	// TODO revisar esto
	if (T - cantidadDias * 1440 >= 1440) {
		cantidadDias++;
		STO += CHT - SHTD; // TODO deberia ir aca?
		SHTD = 0;
		if (cantidadDias - cantidadMeses * 30 >= 30) {
			cantidadMeses++;
			SF += SFM;
			SFM = 0;
		}
	}
}

function gananciaDeFacturacion(facturacion){
	return facturacion * 0.24;
}

function calcularResultados(CHT) {
	const CHML = cantidadDias * CHT, // Cantidad de horas dedicadas a ML (trabajadas o no)
		CD = cantidadDias; // Cantidad de días trabajados

	console.log(`Porcentaje de tiempo ocioso (PTO): ${STO * 100 / CHML}%`);
	console.log(`Promedio de ganancia por hora (PGH): $${gananciaDeFacturacion(SF) / CHML}/H`);
	console.log(`Porcentaje de ganancia en tiempo excedido (PGTE): ${SFPTE * 100 / (SF + SFPTE)}%`);
	console.log(`Promedio de pedidos atendidos por día (PPAD): ${CPA / CD} pedidos`);
	console.log(`Porcentaje de ganancia pérdida por exceder facturación (PGPEF): ${SFPEF * 100 / (SF + SFPEF)}%`);
}

const CC = process.argv[2];
const CHT = process.argv[3];
simular(CC, CHT);
