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
const AJUSTES = document.getElementById('ajustes');

const DIAS_VACACIONES = document.getElementById('vacaciones');
const HORAS_SEMANA_CONTRATO = document.getElementById('horas-semana');

const redondearDosDecimales = (num) => Math.round(num * 100) / 100;

// Plus adicionales

const PLUS_FESTIVO = PRECIO_HORA * 0.25;
const PLUS_FESTIVO_ESPECIAL = PRECIO_HORA * 0.75;
const PLUS_NOCTURNIDAD = PRECIO_HORA * 0.25;
const PLUS_AFLUENCIA = PRECIO_HORA * 0.5;
const PLUS_EVENTO = 3;

// Tasas de cotización

const PORCENTAJE_CONTINGENCIAS_COMUNES = 0.047;
const PORCENTAJE_MECANISMO_EQUIDAD_INTERGENERACIONAL = 0.0013;
const PORCENTAJE_FORMACION_PROFESIONAL = 0.001;
const PORCENTAJE_DESEMPLEO = 0.0155;

const DIAS_SEMANA = 7;

// MARK: VACACIONES

const calcularVacaciones = () => {
	const HORAS_VACACIONES = HORAS_SEMANA_CONTRATO.value / DIAS_SEMANA * DIAS_VACACIONES.value;

	let remuneracionVacaciones;

	DIAS_VACACIONES.value === "" || DIAS_VACACIONES.value === 0
		? remuneracionVacaciones = 0
		: remuneracionVacaciones = HORAS_VACACIONES * PRECIO_HORA;

	return remuneracionVacaciones;
}

// MARK: SALARIO BRUTO

const calcularSalarioBruto = () => {

	// const SALARIO_4_HORAS = TURNOS_4_HORAS.value * PRECIO_HORA * 4;
	// const SALARIO_5_HORAS = TURNOS_5_HORAS.value * PRECIO_HORA * 5;
	// const SALARIO_6_5_HORAS = TURNOS_6_5_HORAS.value * PRECIO_HORA * 6.5;
	// const SALARIO_7_HORAS = TURNOS_7_HORAS.value * PRECIO_HORA * 7;
	// const SALARIO_8_HORAS = TURNOS_8_HORAS.value * PRECIO_HORA * 8;
	// const SALARIO_8_25_HORAS = TURNOS_8_25_HORAS.value * PRECIO_HORA * 8.25;

	const SALARIO_COACHING = redondearDosDecimales(COACHING.value * PRECIO_HORA);
	const SALARIO_FORMACION = FORMACION.value * PRECIO_HORA;
	const SALARIO_EVENTO = EVENTO.value * PRECIO_HORA + PLUS_EVENTO * EVENTO.value;
	const SALARIO_AJUSTES = Number(AJUSTES.value);

	const SALARIO_NOCTURNIDAD = redondearDosDecimales(TURNOS_8_HORAS.value * PLUS_NOCTURNIDAD * 0.75 + TURNOS_8_25_HORAS.value * PLUS_NOCTURNIDAD);
	const SALARIO_AFLUENCIA = HORAS_AFLUENCIA.value * PLUS_AFLUENCIA;
	const SALARIO_FESTIVO = PLUS_FESTIVO * FESTIVO.value;
	const SALARIO_FESTIVO_ESPECIAL = redondearDosDecimales(PLUS_FESTIVO_ESPECIAL * FESTIVO_ESPECIAL.value);

	const SALARIO_VACACIONES = calcularVacaciones();

	const HORAS_LABORALES = redondearDosDecimales(
		((TURNOS_4_HORAS.value * 4) +
		(TURNOS_5_HORAS.value * 5) +
		(TURNOS_6_5_HORAS.value * 6.5) +
		(TURNOS_7_HORAS.value * 7) +
		(TURNOS_8_HORAS.value * 8) +
		(TURNOS_8_25_HORAS.value * 8.25)) * PRECIO_HORA);

	const SALARIO_BRUTO =
		HORAS_LABORALES +
		SALARIO_COACHING +
		SALARIO_FORMACION +
		SALARIO_NOCTURNIDAD +
		SALARIO_AFLUENCIA +
		SALARIO_FESTIVO +
		SALARIO_FESTIVO_ESPECIAL +
		SALARIO_EVENTO +
		SALARIO_AJUSTES +
		SALARIO_VACACIONES;

	return {
		HORAS_LABORALES,
		SALARIO_COACHING,
		SALARIO_FORMACION,
		SALARIO_NOCTURNIDAD,
		SALARIO_AFLUENCIA,
		SALARIO_FESTIVO,
		SALARIO_FESTIVO_ESPECIAL,
		SALARIO_EVENTO,
		SALARIO_AJUSTES,
		SALARIO_VACACIONES,
		SALARIO_BRUTO
	};
}

// MARK: COTIZACIONES

const calcularCotizaciones = (salarioBruto) => {

	const CONTINGENCIAS_COMUNES = salarioBruto * PORCENTAJE_CONTINGENCIAS_COMUNES;
	const MECANISMO_EQUIDAD_INTERGENERACIONAL = salarioBruto * PORCENTAJE_MECANISMO_EQUIDAD_INTERGENERACIONAL;
	const FORMACION_PROFESIONAL = salarioBruto * PORCENTAJE_FORMACION_PROFESIONAL;
	const DESEMPLEO = salarioBruto * PORCENTAJE_DESEMPLEO;

	const TOTAL =
		CONTINGENCIAS_COMUNES +
		MECANISMO_EQUIDAD_INTERGENERACIONAL +
		FORMACION_PROFESIONAL +
		DESEMPLEO;

	return {
		CONTINGENCIAS_COMUNES,
		MECANISMO_EQUIDAD_INTERGENERACIONAL,
		FORMACION_PROFESIONAL,
		DESEMPLEO,
		TOTAL
	};
}

// MARK: NOMINA

const calcularNomina = () => {

	const SALARIO_BRUTO = calcularSalarioBruto();

	const COTIZACION = calcularCotizaciones(SALARIO_BRUTO.SALARIO_BRUTO);

	const SALARIO_NETO = SALARIO_BRUTO.SALARIO_BRUTO - COTIZACION.TOTAL;

	OUTPUT.innerHTML =
		`
			<h2>Horas laborales: ${SALARIO_BRUTO.HORAS_LABORALES} €.</h2>

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
			<p>-Ajustes salariales: ${SALARIO_BRUTO.SALARIO_AJUSTES} €.</p>

			<h2>Salario bruto: ${SALARIO_BRUTO.SALARIO_BRUTO} €.</h2>

			<h2>Cotizaciones:</h2>

			<p>-Contingencias comunes: -${COTIZACION.CONTINGENCIAS_COMUNES} €.</p>
			<p>-Mecanismo de equidad intergeneracional: -${COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL} €.</p>
			<p>-Formación profesional: -${COTIZACION.FORMACION_PROFESIONAL} €.</p>
			<p>-Desempleo: -${COTIZACION.DESEMPLEO} €.</p>

			<h2>Deducciones: -${COTIZACION.TOTAL} €.</h2>

			<h2>Salario neto: ${SALARIO_NETO} €.</h2>
		`;
}

FORM.onsubmit = () => calcularNomina();