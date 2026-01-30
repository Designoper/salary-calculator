const PRECIO_HORA = 10.85;

const FORM = document.querySelector('form');
const OUTPUT = FORM.querySelector('output');

// Obtener elementos de inputs
const HORAS_AFLUENCIA = document.getElementById('plus-afluencia');

const TURNOS = {
	CUATRO_HORAS: document.getElementById('4-horas'),
	CINCO_HORAS: document.getElementById('5-horas'),
	SEIS_Y_MEDIA_HORAS: document.getElementById('6.5-horas'),
	SIETE_HORAS: document.getElementById('7-horas'),
	OCHO_HORAS: document.getElementById('8-horas'),
	OCHO_Y_CUARTO_HORAS: document.getElementById('8.25-horas'),
}

const FESTIVO = document.getElementById('festivo');
const FESTIVO_ESPECIAL = document.getElementById('festivo-especial');
const EVENTO = document.getElementById('evento');
const FORMACION = document.getElementById('formacion');
const AJUSTES = document.getElementById('ajustes');

const DIAS_VACACIONES = document.getElementById('vacaciones');
const HORAS_SEMANA_CONTRATO = document.getElementById('horas-semana');

// Helpers: parse numeric input safely and round/format values
const getNumber = (el) => {
	if (!el) return 0;
	const v = parseFloat(el.value);
	return Number.isFinite(v) ? v : 0;
};

const roundTwo = (num) => Number((num || 0).toFixed(2));

// Plus adicionales

const PLUS = {
	FESTIVO: PRECIO_HORA * 0.25,
	FESTIVO_ESPECIAL: PRECIO_HORA * 0.75,
	NOCTURNIDAD: PRECIO_HORA * 0.25,
	AFLUENCIA: PRECIO_HORA * 0.5,
	EVENTO: 3
}

// Tasas de cotización

const PORCENTAJE_COTIZACION = {
	CONTINGENCIAS_COMUNES: 0.047,
	MECANISMO_EQUIDAD_INTERGENERACIONAL: 0.0013,
	FORMACION_PROFESIONAL: 0.001,
	DESEMPLEO: 0.0155
}

const DIAS_SEMANA = 7;

// MARK: VACACIONES

const calcularVacaciones = () => {
	const dias = getNumber(DIAS_VACACIONES);
	if (dias === 0) return 0;
	const horasSemana = getNumber(HORAS_SEMANA_CONTRATO);
	const horasVacaciones = (horasSemana / DIAS_SEMANA) * dias;
	return roundTwo(horasVacaciones * PRECIO_HORA);
};

// MARK: SALARIO BRUTO

const calcularSalarioBruto = () => {
	const SALARIO_BRUTO = {
		COACHING: PRECIO_HORA,
		FORMACION: roundTwo(getNumber(FORMACION) * PRECIO_HORA),
		EVENTO: roundTwo(getNumber(EVENTO) * PRECIO_HORA + PLUS.EVENTO * getNumber(EVENTO)),
		AJUSTES: roundTwo(getNumber(AJUSTES)),
		NOCTURNIDAD: roundTwo(
			getNumber(TURNOS.OCHO_HORAS) * PLUS.NOCTURNIDAD * 0.75 +
			getNumber(TURNOS.OCHO_Y_CUARTO_HORAS) * PLUS.NOCTURNIDAD
		),
		AFLUENCIA: roundTwo(getNumber(HORAS_AFLUENCIA) * PLUS.AFLUENCIA),
		FESTIVO: roundTwo(PLUS.FESTIVO * getNumber(FESTIVO)),
		FESTIVO_ESPECIAL: roundTwo(PLUS.FESTIVO_ESPECIAL * getNumber(FESTIVO_ESPECIAL)),
		VACACIONES: calcularVacaciones(),
		HORAS_LABORALES: roundTwo(
			(
				(getNumber(TURNOS.CUATRO_HORAS) * 4) +
				(getNumber(TURNOS.CINCO_HORAS) * 5) +
				(getNumber(TURNOS.SEIS_Y_MEDIA_HORAS) * 6.5) +
				(getNumber(TURNOS.SIETE_HORAS) * 7) +
				(getNumber(TURNOS.OCHO_HORAS) * 8) +
				(getNumber(TURNOS.OCHO_Y_CUARTO_HORAS) * 8.25)
			) * PRECIO_HORA
		),
		total() {
			return (
				this.COACHING +
				this.FORMACION +
				this.EVENTO +
				this.AJUSTES +
				this.NOCTURNIDAD +
				this.AFLUENCIA +
				this.FESTIVO +
				this.FESTIVO_ESPECIAL +
				this.VACACIONES +
				this.HORAS_LABORALES
			);
		}
	}

	return SALARIO_BRUTO;
};

// MARK: COTIZACIONES

const calcularCotizaciones = (salarioBruto) => {
	const COTIZACION = {
		CONTINGENCIAS_COMUNES: roundTwo(salarioBruto * PORCENTAJE_COTIZACION.CONTINGENCIAS_COMUNES),
		MECANISMO_EQUIDAD_INTERGENERACIONAL: roundTwo(salarioBruto * PORCENTAJE_COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL),
		FORMACION_PROFESIONAL: roundTwo(salarioBruto * PORCENTAJE_COTIZACION.FORMACION_PROFESIONAL),
		DESEMPLEO: roundTwo(salarioBruto * PORCENTAJE_COTIZACION.DESEMPLEO),
		total() {
			return this.CONTINGENCIAS_COMUNES +
				this.MECANISMO_EQUIDAD_INTERGENERACIONAL +
				this.FORMACION_PROFESIONAL +
				this.DESEMPLEO;
		}
	};

	return COTIZACION;
}

// MARK: NOMINA

const calcularNomina = () => {
	const SALARIO_BRUTO = calcularSalarioBruto();
	const COTIZACION = calcularCotizaciones(SALARIO_BRUTO.total());
	const SALARIO_NETO = roundTwo(SALARIO_BRUTO.total() - COTIZACION.total());

	const fmt = (n) => roundTwo(n).toFixed(2);

	OUTPUT.innerHTML =
		`
			<h2>Horas laborales: ${fmt(SALARIO_BRUTO.HORAS_LABORALES)} €.</h2>

			<h2>Pluses:</h2>

			<p>-Nocturnidad: ${fmt(SALARIO_BRUTO.NOCTURNIDAD)} €.</p>
			<p>-Afluencia: ${fmt(SALARIO_BRUTO.AFLUENCIA)} €.</p>
			<p>-Festivos: ${fmt(SALARIO_BRUTO.FESTIVO)} €.</p>
			<p>-Festivos especiales: ${fmt(SALARIO_BRUTO.FESTIVO_ESPECIAL)} €.</p>

			<h2>Otros conceptos:</h2>

			<p>-Coaching: ${fmt(SALARIO_BRUTO.COACHING)} €.</p>
			<p>-Formación: ${fmt(SALARIO_BRUTO.FORMACION)} €.</p>
			<p>-Eventos: ${fmt(SALARIO_BRUTO.EVENTO)} €.</p>
			<p>-Vacaciones: ${fmt(SALARIO_BRUTO.VACACIONES)} €.</p>
			<p>-Ajustes salariales: ${fmt(SALARIO_BRUTO.AJUSTES)} €.</p>

			<h2>Salario bruto: ${fmt(SALARIO_BRUTO.total())} €.</h2>

			<h2>Cotizaciones:</h2>

			<p>-Contingencias comunes: -${fmt(COTIZACION.CONTINGENCIAS_COMUNES)} €.</p>
			<p>-Mecanismo de equidad intergeneracional: -${fmt(COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL)} €.</p>
			<p>-Formación profesional: -${fmt(COTIZACION.FORMACION_PROFESIONAL)} €.</p>
			<p>-Desempleo: -${fmt(COTIZACION.DESEMPLEO)} €.</p>

			<h2>Deducciones: -${fmt(COTIZACION.total())} €.</h2>

			<h2>Salario neto: ${fmt(SALARIO_NETO)} €.</h2>
		`;
};

FORM.onsubmit = () => calcularNomina();