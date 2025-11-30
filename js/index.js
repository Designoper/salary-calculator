const PRECIO_HORA = 10.85;

const FORM = document.querySelector('form');
const OUTPUT = document.querySelector('form output');

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
const FORMACION = document.getElementById('formacion');

const DIAS_VACACIONES = document.getElementById('vacaciones');
const HORAS_SEMANA_CONTRATO = document.getElementById('horas-semana');

const redondearDosDecimales = (num) => Math.round(num * 100) / 100;

// Plus adicionales

const PLUS_FESTIVO = redondearDosDecimales(PRECIO_HORA * 0.25);
const PLUS_FESTIVO_ESPECIAL = redondearDosDecimales(PRECIO_HORA * 0.75);
const PLUS_NOCTURNIDAD = redondearDosDecimales(PRECIO_HORA * 0.25);
const PLUS_AFLUENCIA = redondearDosDecimales(PRECIO_HORA * 0.5);
const PLUS_EVENTO = 3;

// Tasas de cotización

const PORCENTAJE_CONTINGENCIAS_COMUNES = 0.047;
const PORCENTAJE_DESEMPLEO = 0.0155;
const PORCENTAJE_FORMACION_PROFESIONAL = 0.001;
const PORCENTAJE_MECANISMO_EQUIDAD_INTERGENERACIONAL = 0.0013;

const DIAS_SEMANA = 7;



// MARK: SALARIO BRUTO

const calcularSalarioBruto = () => {

	const SALARIO_4_HORAS = redondearDosDecimales(TURNOS_4_HORAS.value * PRECIO_HORA * 4);
	const SALARIO_5_HORAS = redondearDosDecimales(TURNOS_5_HORAS.value * PRECIO_HORA * 5);
	const SALARIO_6_5_HORAS = redondearDosDecimales(TURNOS_6_5_HORAS.value * PRECIO_HORA * 6.5);
	const SALARIO_7_HORAS = redondearDosDecimales(TURNOS_7_HORAS.value * PRECIO_HORA * 7);
	const SALARIO_8_HORAS = redondearDosDecimales(TURNOS_8_HORAS.value * PRECIO_HORA * 8);
	const SALARIO_8_25_HORAS = redondearDosDecimales(TURNOS_8_25_HORAS.value * PRECIO_HORA * 8.25);

	const SALARIO_COACHING = redondearDosDecimales(COACHING.value * PRECIO_HORA);
	const SALARIO_FORMACION = redondearDosDecimales(FORMACION.value * PRECIO_HORA);
	const SALARIO_EVENTO = redondearDosDecimales(EVENTO.value * PRECIO_HORA + PLUS_EVENTO * EVENTO.value);

	const SALARIO_NOCTURNIDAD = redondearDosDecimales(TURNOS_8_HORAS.value * PLUS_NOCTURNIDAD * 0.75 + TURNOS_8_25_HORAS.value * PLUS_NOCTURNIDAD);
	const SALARIO_AFLUENCIA = redondearDosDecimales(HORAS_AFLUENCIA.value * PLUS_AFLUENCIA);
	const SALARIO_FESTIVO = redondearDosDecimales(PLUS_FESTIVO * FESTIVO.value);
	const SALARIO_FESTIVO_ESPECIAL = redondearDosDecimales(PLUS_FESTIVO_ESPECIAL * FESTIVO_ESPECIAL.value);

	const SALARIO_VACACIONES = calcularVacaciones();

	const SALARIO_BRUTO =
		redondearDosDecimales(
			SALARIO_4_HORAS +
			SALARIO_5_HORAS +
			SALARIO_6_5_HORAS +
			SALARIO_7_HORAS +
			SALARIO_8_HORAS +
			SALARIO_8_25_HORAS +
			SALARIO_COACHING +
			SALARIO_FORMACION +
			SALARIO_NOCTURNIDAD +
			SALARIO_AFLUENCIA +
			SALARIO_FESTIVO +
			SALARIO_FESTIVO_ESPECIAL +
			SALARIO_EVENTO +
			SALARIO_VACACIONES);

	return {
		SALARIO_4_HORAS,
		SALARIO_5_HORAS,
		SALARIO_6_5_HORAS,
		SALARIO_7_HORAS,
		SALARIO_8_HORAS,
		SALARIO_8_25_HORAS,
		SALARIO_COACHING,
		SALARIO_FORMACION,
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

	const CONTINGENCIAS_COMUNES = redondearDosDecimales(salarioBruto * PORCENTAJE_CONTINGENCIAS_COMUNES);
	const DESEMPLEO = redondearDosDecimales(salarioBruto * PORCENTAJE_DESEMPLEO);
	const FORMACION_PROFESIONAL = redondearDosDecimales(salarioBruto * PORCENTAJE_FORMACION_PROFESIONAL);
	const MECANISMO_EQUIDAD_INTERGENERACIONAL = redondearDosDecimales(salarioBruto * PORCENTAJE_MECANISMO_EQUIDAD_INTERGENERACIONAL);

	const TOTAL =
		redondearDosDecimales(
			CONTINGENCIAS_COMUNES +
			DESEMPLEO +
			FORMACION_PROFESIONAL +
			MECANISMO_EQUIDAD_INTERGENERACIONAL);

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
	const HORAS_VACACIONES = redondearDosDecimales(HORAS_SEMANA_CONTRATO.value / DIAS_SEMANA * DIAS_VACACIONES.value);

	let remuneracionVacaciones;

	DIAS_VACACIONES.value === 0
		? remuneracionVacaciones = 0
		: remuneracionVacaciones = redondearDosDecimales(HORAS_VACACIONES * PRECIO_HORA);

	return remuneracionVacaciones;
}

// MARK: NOMINA

const calcularNomina = () => {

	const SALARIO_BRUTO = calcularSalarioBruto();

	const COTIZACION = calcularCotizaciones(SALARIO_BRUTO.SALARIO_BRUTO);

	const SALARIO_NETO = redondearDosDecimales(SALARIO_BRUTO.SALARIO_BRUTO - COTIZACION.TOTAL);

	OUTPUT.innerHTML =
		`
			<h2>Turnos laborales:</h2>

			<p>-4 horas: ${SALARIO_BRUTO.SALARIO_4_HORAS} €.</p>
			<p>-5 horas: ${SALARIO_BRUTO.SALARIO_5_HORAS} €.</p>
			<p>-6.5 horas: ${SALARIO_BRUTO.SALARIO_6_5_HORAS} €.</p>
			<p>-7 horas: ${SALARIO_BRUTO.SALARIO_7_HORAS} €.</p>
			<p>-8 horas: ${SALARIO_BRUTO.SALARIO_8_HORAS} €.</p>
			<p>-8.25 horas: ${SALARIO_BRUTO.SALARIO_8_25_HORAS} €.</p>

			<h2>Pluses:</h2>

			<p>-Nocturnidad: ${SALARIO_BRUTO.SALARIO_NOCTURNIDAD} €.</p>
			<p>-Afluencia: ${SALARIO_BRUTO.SALARIO_AFLUENCIA} €.</p>
			<p>-Festivos: ${SALARIO_BRUTO.SALARIO_FESTIVO} €.</p>
			<p>-Festivos especiales: ${SALARIO_BRUTO.SALARIO_FESTIVO_ESPECIAL} €.</p>

			<h2>Otros conceptos:</h2>

			<p>-Coaching: ${SALARIO_BRUTO.SALARIO_COACHING} €.</p>
			<p>-Formación: ${SALARIO_BRUTO.SALARIO_FORMACION} €.</p>
			<p>-Eventos: ${SALARIO_BRUTO.SALARIO_EVENTO} €.</p>
			<p>-Vacaciones: ${SALARIO_BRUTO.SALARIO_VACACIONES} €.</p>

			<h2>Salario bruto: ${SALARIO_BRUTO.SALARIO_BRUTO} €.</h2>

			<h2>Cotizaciones:</h2>

			<p>-Contingencias comunes: -${COTIZACION.CONTINGENCIAS_COMUNES} €.</p>
			<p>-Desempleo: -${COTIZACION.DESEMPLEO} €.</p>
			<p>-Formación profesional: -${COTIZACION.FORMACION_PROFESIONAL} €.</p>
			<p>-Mecanismo de equidad intergeneracional: -${COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL} €.</p>

			<h2>Deducciones: -${COTIZACION.TOTAL} €.</h2>

			<h2>Salario neto: ${SALARIO_NETO} €.</h2>
		`;
}

FORM.onsubmit = () => calcularNomina();