const PRECIO_HORA = 10.85;

const FORM = document.querySelector('form');
const OUTPUT = FORM.querySelector('output');

const roundTwo = (num) => Number((num || 0).toFixed(2));

const createNomina = () => ({

	PRECIO_HORA: 10.85,

	TURNOS: {
		CUATRO_HORAS: Number(document.getElementById('4-horas').value),
		CINCO_HORAS: Number(document.getElementById('5-horas').value),
		SEIS_Y_MEDIA_HORAS: Number(document.getElementById('6.5-horas').value),
		SIETE_HORAS: Number(document.getElementById('7-horas').value),
		OCHO_HORAS: Number(document.getElementById('8-horas').value),
		OCHO_Y_CUARTO_HORAS: Number(document.getElementById('8.25-horas').value),
	},

	VACACIONES: {
		DIAS: Number(document.getElementById('vacaciones').value),
		HORAS_SEMANA: Number(document.getElementById('horas-semana').value),
		DIAS_SEMANA: 7,
		TOTAL: 0
	},

	PLUS: {
		FESTIVO: PRECIO_HORA * 0.25,
		FESTIVO_ESPECIAL: PRECIO_HORA * 0.75,
		NOCTURNIDAD: PRECIO_HORA * 0.25,
		AFLUENCIA: PRECIO_HORA * 0.5,
		EVENTO: 3
	},

	HORAS_AFLUENCIA: Number(document.getElementById('plus-afluencia').value),

	FESTIVO: Number(document.getElementById('festivo').value),
	FESTIVO_ESPECIAL: Number(document.getElementById('festivo-especial').value),
	EVENTO: Number(document.getElementById('evento').value),
	FORMACION: Number(document.getElementById('formacion').value),
	AJUSTES: Number(document.getElementById('ajustes').value),

	SALARIO_BRUTO: {
		COACHING: 0,
		FORMACION: 0,
		EVENTO: 0,
		AJUSTES: 0,
		NOCTURNIDAD: 0,
		AFLUENCIA: 0,
		FESTIVO: 0,
		FESTIVO_ESPECIAL: 0,
		VACACIONES: 0,
		HORAS_LABORALES: 0,
		TOTAL: 0,
	},

	COTIZACION: {
		PORCENTAJE: {
			CONTINGENCIAS_COMUNES: 0.047,
			MECANISMO_EQUIDAD_INTERGENERACIONAL: 0.0013,
			FORMACION_PROFESIONAL: 0.001,
			DESEMPLEO: 0.0155
		},
		CONTINGENCIAS_COMUNES: 0,
		MECANISMO_EQUIDAD_INTERGENERACIONAL: 0,
		FORMACION_PROFESIONAL: 0,
		DESEMPLEO: 0,
		TOTAL: 0,
	},

	SALARIO_NETO: 0,

	calcularVacaciones() {
		this.VACACIONES.TOTAL = this.VACACIONES.DIAS === 0
			? this.VACACIONES.TOTAL = 0
			: this.VACACIONES.TOTAL = this.VACACIONES.HORAS_SEMANA / this.VACACIONES.DIAS_SEMANA * this.VACACIONES.DIAS * this.PRECIO_HORA;
	},

	calcularSalarioBruto() {
		this.SALARIO_BRUTO.COACHING = this.PRECIO_HORA;
		this.SALARIO_BRUTO.FORMACION = this.FORMACION * this.PRECIO_HORA;
		this.SALARIO_BRUTO.EVENTO = this.EVENTO * this.PRECIO_HORA + this.PLUS.EVENTO * this.EVENTO;
		this.SALARIO_BRUTO.AJUSTES = this.AJUSTES;
		this.SALARIO_BRUTO.NOCTURNIDAD =
			this.TURNOS.OCHO_HORAS * this.PLUS.NOCTURNIDAD * 0.75 +
			this.TURNOS.OCHO_Y_CUARTO_HORAS * this.PLUS.NOCTURNIDAD;
		this.SALARIO_BRUTO.AFLUENCIA = this.HORAS_AFLUENCIA * this.PLUS.AFLUENCIA;
		this.SALARIO_BRUTO.FESTIVO = this.PLUS.FESTIVO * this.FESTIVO;
		this.SALARIO_BRUTO.FESTIVO_ESPECIAL = this.PLUS.FESTIVO_ESPECIAL * this.FESTIVO_ESPECIAL;
		this.SALARIO_BRUTO.VACACIONES = this.VACACIONES.TOTAL;
		this.SALARIO_BRUTO.HORAS_LABORALES =
			(
				this.TURNOS.CUATRO_HORAS * 4 +
				this.TURNOS.CINCO_HORAS * 5 +
				this.TURNOS.SEIS_Y_MEDIA_HORAS * 6.5 +
				this.TURNOS.SIETE_HORAS * 7 +
				this.TURNOS.OCHO_HORAS * 8 +
				this.TURNOS.OCHO_Y_CUARTO_HORAS * 8.25
			) * this.PRECIO_HORA;

		this.SALARIO_BRUTO.TOTAL =
			this.SALARIO_BRUTO.COACHING +
			this.SALARIO_BRUTO.FORMACION +
			this.SALARIO_BRUTO.EVENTO +
			this.SALARIO_BRUTO.AJUSTES +
			this.SALARIO_BRUTO.NOCTURNIDAD +
			this.SALARIO_BRUTO.AFLUENCIA +
			this.SALARIO_BRUTO.FESTIVO +
			this.SALARIO_BRUTO.FESTIVO_ESPECIAL +
			this.SALARIO_BRUTO.VACACIONES +
			this.SALARIO_BRUTO.HORAS_LABORALES;
	},

	calcularCotizaciones() {
		this.COTIZACION.CONTINGENCIAS_COMUNES = this.COTIZACION.PORCENTAJE.CONTINGENCIAS_COMUNES * this.SALARIO_BRUTO.TOTAL;
		this.COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL = this.COTIZACION.PORCENTAJE.MECANISMO_EQUIDAD_INTERGENERACIONAL * this.SALARIO_BRUTO.TOTAL;
		this.COTIZACION.FORMACION_PROFESIONAL = this.COTIZACION.PORCENTAJE.FORMACION_PROFESIONAL * this.SALARIO_BRUTO.TOTAL;
		this.COTIZACION.DESEMPLEO = this.COTIZACION.PORCENTAJE.DESEMPLEO * this.SALARIO_BRUTO.TOTAL;
		this.COTIZACION.TOTAL =
			this.COTIZACION.CONTINGENCIAS_COMUNES +
			this.COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL +
			this.COTIZACION.FORMACION_PROFESIONAL +
			this.COTIZACION.DESEMPLEO;
	},

	calcularSalarioNeto() {
		this.SALARIO_NETO = this.SALARIO_BRUTO.TOTAL - this.COTIZACION.TOTAL;
	},

	calcular() {
		this.calcularVacaciones();
		this.calcularSalarioBruto();
		this.calcularCotizaciones();
		this.calcularSalarioNeto();
	}
});

// MARK: NOMINA

const calcularNomina = () => {
	const Nomina = createNomina();
	Nomina.calcular();

	const fmt = (n) => roundTwo(n).toFixed(2);

	OUTPUT.innerHTML =
		`
			<h2>Horas laborales: ${fmt(Nomina.SALARIO_BRUTO.HORAS_LABORALES)} €.</h2>

			<h2>Pluses:</h2>

			<p>-Nocturnidad: ${fmt(Nomina.SALARIO_BRUTO.NOCTURNIDAD)} €.</p>
			<p>-Afluencia: ${fmt(Nomina.SALARIO_BRUTO.AFLUENCIA)} €.</p>
			<p>-Festivos: ${fmt(Nomina.SALARIO_BRUTO.FESTIVO)} €.</p>
			<p>-Festivos especiales: ${fmt(Nomina.SALARIO_BRUTO.FESTIVO_ESPECIAL)} €.</p>

			<h2>Otros conceptos:</h2>

			<p>-Coaching: ${fmt(Nomina.SALARIO_BRUTO.COACHING)} €.</p>
			<p>-Formación: ${fmt(Nomina.SALARIO_BRUTO.FORMACION)} €.</p>
			<p>-Eventos: ${fmt(Nomina.SALARIO_BRUTO.EVENTO)} €.</p>
			<p>-Vacaciones: ${fmt(Nomina.SALARIO_BRUTO.VACACIONES)} €.</p>
			<p>-Ajustes salariales: ${fmt(Nomina.SALARIO_BRUTO.AJUSTES)} €.</p>

			<h2>Salario bruto: ${fmt(Nomina.SALARIO_BRUTO.TOTAL)} €.</h2>

			<h2>Cotizaciones:</h2>

			<p>-Contingencias comunes: -${fmt(Nomina.COTIZACION.CONTINGENCIAS_COMUNES)} €.</p>
			<p>-Mecanismo de equidad intergeneracional: -${fmt(Nomina.COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL)} €.</p>
			<p>-Formación profesional: -${fmt(Nomina.COTIZACION.FORMACION_PROFESIONAL)} €.</p>
			<p>-Desempleo: -${fmt(Nomina.COTIZACION.DESEMPLEO)} €.</p>

			<h2>Deducciones: -${fmt(Nomina.COTIZACION.TOTAL)} €.</h2>

			<h2>Salario neto: ${fmt(Nomina.SALARIO_NETO)} €.</h2>
		`;
};

FORM.onsubmit = () => calcularNomina();