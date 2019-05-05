console.log("------------------ Inicio simulación ------------------");
console.log("Fijación de condiciones iniciales del modelo");
const TF = 525600; // Un año en minutos
var T = 0, TPV = 0,	// Se manejan en minutos
	SHTD = 0, // Variable de estado (en horas)
	SFM = 0,
	cantidadDias = 0, cantidadMeses = 0, // Sirven para reiniciar la facutracion mensual
	STO = 0, SF = 0, CPA = 0, SFPEF = 0, SFPTE = 0; // Variables para cálculos de resultados

// Recibe por parametro las variables de control
function simular(CC, CHT) {
	const TOPE_FACTURACION = 90000 * CC; // 90000 (por afip) por cada cuenta que tenga

	while(T < TF) {
		T = TPV;
		
		const IV = intervaloEntreVentas(); // Intervalo en minutos
		TPV = T + IV;
		console.log("La próxima venta sera en:", IV);

		const MV = montoVenta(); // Monto en $
		console.log("Monto de la próxima venta:", MV);

		reiniciarVariables(CHT);

		if (SHTD < CHT) {
			if (SFM < TOPE_FACTURACION) {
				console.log("Atiendo un pedido");
				SHTD += 0.25; // Sumo 15 minutos (en horas)
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

function intervaloEntreVentas() {
	const R = Math.random();
	if (R < 0.1 || R > 0.8) return intervaloEntreVentas();
	console.log("R = " + R);
	return (186.27 / (((1 / R) - 1) ** (1 / 0.85143))); // B / (Raiz A de ((1 / R - 1))
}

function montoVenta() {
	const R = Math.random(), ln = Math.log;
	if (R <= 0.09 || R >= 0.99) return montoVenta();
	
	return -491.09 * ln((1 - R) / (R * Math.exp(2.935511))); // -Cte * ln(1 - R / R * e a la OtraCte)
}

function reiniciarVariables(CHT) {
	// TODO revisar esto
	while (T - (cantidadDias * 1440) >= 1440) { // Me fijo si paso al menos un dia		
		cantidadDias++;
		STO += CHT - SHTD; // Tiempo ocioso en horas
		SHTD = 0;
		if (cantidadDias - (cantidadMeses * 30) >= 30) { // Me fijo si paso al menos un mes
			cantidadMeses++;
			SF += SFM;
			SFM = 0;
		}
	}
}

function gananciaDeFacturacion(facturacion){
	return facturacion * 0.24;
}

function redondearResultado(resultado){
	return Math.round(resultado, 2)
}

function calcularResultados(CHT) {
	const CHML = cantidadDias * CHT, // Cantidad de horas dedicadas a ML (trabajadas o no)
		CD = cantidadDias, // Cantidad de días trabajados
		SG = gananciaDeFacturacion(SF),
		SGPTE = gananciaDeFacturacion(SFPTE),
		SGPEF = gananciaDeFacturacion(SFPEF);

	console.log(`Porcentaje de tiempo ocioso (PTO): ${redondearResultado(STO * 100 / CHML)}%`);
	console.log(`Promedio de ganancia por hora (PGH): $${redondearResultado(SG / CHML)}/H`);
	console.log(`Porcentaje de ganancia en tiempo excedido (PGTE): ${redondearResultado(SGPTE * 100 / (SG + SGPTE))}%`);
	console.log(`Promedio de pedidos atendidos por día (PPAD): ${redondearResultado(CPA / CD)} pedidos`);
	console.log(`Porcentaje de ganancia pérdida por exceder facturación (PGPEF): ${redondearResultado(SGPEF * 100 / (SG + SGPEF))}%`);
}

const CC = process.argv[2];
const CHT = process.argv[3];
simular(CC, CHT);
