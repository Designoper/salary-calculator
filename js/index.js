const PRECIO_HORA = 10.85;

const BOTON_CALCULAR = document.querySelector('form button');
const OUTPUT = document.querySelector('form output');

const calcularSalarioBruto = () => {
	const PLUS_FESTIVO_ESPECIAL = PRECIO_HORA * 0.75;
	const PLUS_NOCTURNIDAD = PRECIO_HORA * 0.75 * 0.25;
	const PLUS_EVENTO = 3;

	const TURNOS_4_HORAS = document.getElementById('4-horas');
	const TURNOS_5_HORAS = document.getElementById('5-horas');
	const TURNOS_6_5_HORAS = document.getElementById('6.5-horas');
	const TURNOS_7_HORAS = document.getElementById('7-horas');
	const TURNOS_8_HORAS = document.getElementById('8-horas');

	const COACHING = document.getElementById('coaching');
	const FESTIVO_ESPECIAL = document.getElementById('festivo-especial');
	const EVENTO = document.getElementById('evento');

	const SALARIO_4_HORAS = TURNOS_4_HORAS.value * PRECIO_HORA * 4;
	const SALARIO_5_HORAS = TURNOS_5_HORAS.value * PRECIO_HORA * 5;
	const SALARIO_6_5_HORAS = TURNOS_6_5_HORAS.value * PRECIO_HORA * 6.5;
	const SALARIO_7_HORAS = TURNOS_7_HORAS.value * PRECIO_HORA * 7;
	const SALARIO_8_HORAS = TURNOS_8_HORAS.value * PRECIO_HORA * 8 + PLUS_NOCTURNIDAD * TURNOS_8_HORAS.value;
	const SALARIO_COACHING = COACHING.value * PRECIO_HORA;

	const SALARIO_FESTIVO_ESPECIAL = PLUS_FESTIVO_ESPECIAL * FESTIVO_ESPECIAL.value;
	const SALARIO_EVENTO = EVENTO.value * PRECIO_HORA + PLUS_EVENTO * EVENTO.value;

	const VACACIONES = calcularVacaciones();

	const SALARIO_BRUTO = SALARIO_4_HORAS + SALARIO_5_HORAS + SALARIO_6_5_HORAS + SALARIO_7_HORAS + SALARIO_8_HORAS + SALARIO_COACHING + SALARIO_FESTIVO_ESPECIAL + SALARIO_EVENTO + VACACIONES;

	return {
		SALARIO_4_HORAS,
		SALARIO_5_HORAS,
		SALARIO_6_5_HORAS,
		SALARIO_7_HORAS,
		SALARIO_8_HORAS,
		SALARIO_COACHING,
		SALARIO_FESTIVO_ESPECIAL,
		SALARIO_EVENTO,
		VACACIONES,
		SALARIO_BRUTO
	};
}

const calcularCotizaciones = (salarioBruto) => {
	const CONTINGENCIAS_COMUNES = 0.047;
	const DESEMPLEO = 0.0155;
	const FORMACION_PROFESIONAL = 0.001;
	const MECANISMO_EQUIDAD_INTERGENERACIONAL = 0.0013;

	const COTIZACION_CONTINGENCIAS_COMUNES = salarioBruto * CONTINGENCIAS_COMUNES;
	const COTIZACION_DESEMPLEO = salarioBruto * DESEMPLEO;
	const COTIZACION_FORMACION_PROFESIONAL = salarioBruto * FORMACION_PROFESIONAL;
	const COTIZACION_MECANISMO_EQUIDAD_INTERGENERACIONAL = salarioBruto * MECANISMO_EQUIDAD_INTERGENERACIONAL;

	const TOTAL_COTIZACIONES = COTIZACION_CONTINGENCIAS_COMUNES + COTIZACION_DESEMPLEO + COTIZACION_FORMACION_PROFESIONAL + COTIZACION_MECANISMO_EQUIDAD_INTERGENERACIONAL;

	return {
		COTIZACION_CONTINGENCIAS_COMUNES,
		COTIZACION_DESEMPLEO,
		COTIZACION_FORMACION_PROFESIONAL,
		COTIZACION_MECANISMO_EQUIDAD_INTERGENERACIONAL,
		TOTAL_COTIZACIONES
	};
}

const calcularVacaciones = () => {
	const DIAS_SEMANA = 7;
	const DIAS_VACACIONES = document.getElementById('vacaciones');
	const HORAS_SEMANA_CONTRATO = document.getElementById('horas-semana');
	let remuneracionVacaciones;

	if (DIAS_VACACIONES.value === 0) {
		remuneracionVacaciones = 0;
	}

	else {
		const HORAS_VACACIONES = (HORAS_SEMANA_CONTRATO.value / DIAS_SEMANA) * DIAS_VACACIONES.value;
		remuneracionVacaciones = HORAS_VACACIONES * PRECIO_HORA;
	}

	return remuneracionVacaciones;
}

const calcularNomina = () => {

	const SALARIO_BRUTO = calcularSalarioBruto();

	const COTIZACION = calcularCotizaciones(SALARIO_BRUTO.SALARIO_BRUTO);

	const SALARIO_NETO = SALARIO_BRUTO.SALARIO_BRUTO - COTIZACION.TOTAL_COTIZACIONES;

	OUTPUT.innerHTML =
		`<p>Salario desglosado:</p>

			<p>-4 horas: ${SALARIO_BRUTO.SALARIO_4_HORAS} €.</p>
			<p>-5 horas: ${SALARIO_BRUTO.SALARIO_5_HORAS} €.</p>
			<p>-6.5 horas: ${SALARIO_BRUTO.SALARIO_6_5_HORAS} €.</p>
			<p>-7 horas: ${SALARIO_BRUTO.SALARIO_7_HORAS} €.</p>
			<p>-8 horas: ${SALARIO_BRUTO.SALARIO_8_HORAS} €.</p>
			<p>-Coaching: ${SALARIO_BRUTO.SALARIO_COACHING} €.</p>
			<p>-Festivo especial: ${SALARIO_BRUTO.SALARIO_FESTIVO_ESPECIAL} €.</p>
			<p>-Eventos: ${SALARIO_BRUTO.SALARIO_EVENTO} €.</p>
			<p>-Vacaciones: ${SALARIO_BRUTO.VACACIONES} €.</p>

			<p>Salario bruto: ${SALARIO_BRUTO.SALARIO_BRUTO} €.</p>

			<p>--Cotizaciones--</p>

			<p>-Contingencias comunes: -${COTIZACION.COTIZACION_CONTINGENCIAS_COMUNES} €.</p>
			<p>-Desempleo: -${COTIZACION.COTIZACION_DESEMPLEO} €.</p>
			<p>-Formación profesional: -${COTIZACION.COTIZACION_FORMACION_PROFESIONAL} €.</p>
			<p>-Mecanismo de equidad intergeneracional: -${COTIZACION.COTIZACION_MECANISMO_EQUIDAD_INTERGENERACIONAL} €.</p>
			<p>Total cotizaciones: -${COTIZACION.TOTAL_COTIZACIONES} €.</p>

			<p>Salario neto: ${SALARIO_NETO} €.</p>
		`;
}

BOTON_CALCULAR.onclick = () => calcularNomina();