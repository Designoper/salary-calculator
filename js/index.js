const PRECIO_HORA = 10.85;

const FORM = document.querySelector('form');
const OUTPUT = document.querySelector('form output');

// MARK: SALARIO BRUTO

const calcularSalarioBruto = () => {

	// Plus adicionales

	const PLUS_FESTIVO = PRECIO_HORA * 0.25;
	const PLUS_FESTIVO_ESPECIAL = PRECIO_HORA * 0.75;
	const PLUS_NOCTURNIDAD = PRECIO_HORA * 0.25;
	const PLUS_AFLUENCIA = PRECIO_HORA * 0.5;
	const PLUS_EVENTO = 3;

	// Obtener valores de los inputs

	const TURNOS_4_HORAS = document.getElementById('4-horas');
	const TURNOS_5_HORAS = document.getElementById('5-horas');
	const TURNOS_6_5_HORAS = document.getElementById('6.5-horas');
	const TURNOS_7_HORAS = document.getElementById('7-horas');
	const TURNOS_8_HORAS = document.getElementById('8-horas');
	const TURNOS_8_25_HORAS = document.getElementById('8.25-horas');
	const HORAS_AFLUENCIA = document.getElementById('plus-afluencia');

	const COACHING = document.getElementById('coaching');
	const FESTIVO = document.getElementById('festivo');
	const FESTIVO_ESPECIAL = document.getElementById('festivo-especial');
	const EVENTO = document.getElementById('evento');

	// Cálculo del salario bruto

	const SALARIO_4_HORAS = TURNOS_4_HORAS.value * PRECIO_HORA * 4;
	const SALARIO_5_HORAS = TURNOS_5_HORAS.value * PRECIO_HORA * 5;
	const SALARIO_6_5_HORAS = TURNOS_6_5_HORAS.value * PRECIO_HORA * 6.5;
	const SALARIO_7_HORAS = TURNOS_7_HORAS.value * PRECIO_HORA * 7;
	const SALARIO_8_HORAS = TURNOS_8_HORAS.value * PRECIO_HORA * 8;
	const SALARIO_8_25_HORAS = TURNOS_8_25_HORAS.value * PRECIO_HORA * 8.25;
	const SALARIO_COACHING = COACHING.value * PRECIO_HORA;

	const SALARIO_NOCTURNIDAD = TURNOS_8_HORAS.value * PLUS_NOCTURNIDAD * 0.75 + TURNOS_8_25_HORAS.value * PLUS_NOCTURNIDAD;
	const SALARIO_AFLUENCIA = HORAS_AFLUENCIA.value * PLUS_AFLUENCIA;

	const SALARIO_FESTIVO = PLUS_FESTIVO * FESTIVO.value;
	const SALARIO_FESTIVO_ESPECIAL = PLUS_FESTIVO_ESPECIAL * FESTIVO_ESPECIAL.value;
	const SALARIO_EVENTO = EVENTO.value * PRECIO_HORA + PLUS_EVENTO * EVENTO.value;

	const SALARIO_VACACIONES = calcularVacaciones();

	const SALARIO_BRUTO = SALARIO_4_HORAS + SALARIO_5_HORAS + SALARIO_6_5_HORAS + SALARIO_7_HORAS + SALARIO_8_HORAS + SALARIO_8_25_HORAS + SALARIO_COACHING + SALARIO_NOCTURNIDAD + SALARIO_AFLUENCIA + SALARIO_FESTIVO + SALARIO_FESTIVO_ESPECIAL + SALARIO_EVENTO + SALARIO_VACACIONES;

	return {
		SALARIO_4_HORAS,
		SALARIO_5_HORAS,
		SALARIO_6_5_HORAS,
		SALARIO_7_HORAS,
		SALARIO_8_HORAS,
		SALARIO_8_25_HORAS,
		SALARIO_COACHING,
		SALARIO_NOCTURNIDAD,
		SALARIO_AFLUENCIA,
		SALARIO_FESTIVO,
		SALARIO_FESTIVO_ESPECIAL,
		SALARIO_EVENTO,
		SALARIO_VACACIONES,
		SALARIO_BRUTO
	};
}

// MARK: COTIZACIONES

const calcularCotizaciones = (salarioBruto) => {

	// Tasas de cotización

	const PORCENTAJE_CONTINGENCIAS_COMUNES = 0.047;
	const PORCENTAJE_DESEMPLEO = 0.0155;
	const PORCENTAJE_FORMACION_PROFESIONAL = 0.001;
	const PORCENTAJE_MECANISMO_EQUIDAD_INTERGENERACIONAL = 0.0013;

	// Cálculo de cotizaciones

	const CONTINGENCIAS_COMUNES = salarioBruto * PORCENTAJE_CONTINGENCIAS_COMUNES;
	const DESEMPLEO = salarioBruto * PORCENTAJE_DESEMPLEO;
	const FORMACION_PROFESIONAL = salarioBruto * PORCENTAJE_FORMACION_PROFESIONAL;
	const MECANISMO_EQUIDAD_INTERGENERACIONAL = salarioBruto * PORCENTAJE_MECANISMO_EQUIDAD_INTERGENERACIONAL;

	const TOTAL = CONTINGENCIAS_COMUNES + DESEMPLEO + FORMACION_PROFESIONAL + MECANISMO_EQUIDAD_INTERGENERACIONAL;

	return {
		CONTINGENCIAS_COMUNES,
		DESEMPLEO,
		FORMACION_PROFESIONAL,
		MECANISMO_EQUIDAD_INTERGENERACIONAL,
		TOTAL
	};
}

// MARK: VACACIONES

const calcularVacaciones = () => {
	const DIAS_SEMANA = 7;
	const DIAS_VACACIONES = document.getElementById('vacaciones');
	const HORAS_SEMANA_CONTRATO = document.getElementById('horas-semana');
	const HORAS_VACACIONES = (HORAS_SEMANA_CONTRATO.value / DIAS_SEMANA) * DIAS_VACACIONES.value;

	let remuneracionVacaciones;

	DIAS_VACACIONES.value === 0
		? remuneracionVacaciones = 0
		: remuneracionVacaciones = HORAS_VACACIONES * PRECIO_HORA;

	return remuneracionVacaciones;
}

// MARK: NOMINA

const calcularNomina = () => {

	const SALARIO_BRUTO = calcularSalarioBruto();

	const COTIZACION = calcularCotizaciones(SALARIO_BRUTO.SALARIO_BRUTO);

	const SALARIO_NETO = SALARIO_BRUTO.SALARIO_BRUTO - COTIZACION.TOTAL;

	OUTPUT.innerHTML =
		`
			<p>Salario desglosado:</p>

			<p>-4 horas: ${SALARIO_BRUTO.SALARIO_4_HORAS} €.</p>
			<p>-5 horas: ${SALARIO_BRUTO.SALARIO_5_HORAS} €.</p>
			<p>-6.5 horas: ${SALARIO_BRUTO.SALARIO_6_5_HORAS} €.</p>
			<p>-7 horas: ${SALARIO_BRUTO.SALARIO_7_HORAS} €.</p>
			<p>-8 horas: ${SALARIO_BRUTO.SALARIO_8_HORAS} €.</p>
			<p>-8.25 horas: ${SALARIO_BRUTO.SALARIO_8_25_HORAS} €.</p>
			<p>-Coaching: ${SALARIO_BRUTO.SALARIO_COACHING} €.</p>
			<p>-Plus nocturnidad: ${SALARIO_BRUTO.SALARIO_NOCTURNIDAD} €.</p>
			<p>-Plus afluencia: ${SALARIO_BRUTO.SALARIO_AFLUENCIA} €.</p>
			<p>-Festivos: ${SALARIO_BRUTO.SALARIO_FESTIVO} €.</p>
			<p>-Festivos especiales: ${SALARIO_BRUTO.SALARIO_FESTIVO_ESPECIAL} €.</p>
			<p>-Eventos: ${SALARIO_BRUTO.SALARIO_EVENTO} €.</p>
			<p>-Vacaciones: ${SALARIO_BRUTO.VACACIONES} €.</p>

			<p>Salario bruto: ${SALARIO_BRUTO.SALARIO_BRUTO} €.</p>

			<p>--Cotizaciones--</p>

			<p>-Contingencias comunes: -${COTIZACION.CONTINGENCIAS_COMUNES} €.</p>
			<p>-Desempleo: -${COTIZACION.DESEMPLEO} €.</p>
			<p>-Formación profesional: -${COTIZACION.FORMACION_PROFESIONAL} €.</p>
			<p>-Mecanismo de equidad intergeneracional: -${COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL} €.</p>
			<p>Total cotizaciones: -${COTIZACION.TOTAL} €.</p>

			<p>Salario neto: ${SALARIO_NETO} €.</p>
		`;
}

FORM.onsubmit = () => calcularNomina();