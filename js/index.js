class Nomina {
	constructor() {
		this.FIXED_VALUES = {
			PRECIO_HORA: 10.85,
			VACACIONES: { DIAS_SEMANA: 7 },
			COTIZACION: {
				CONTINGENCIAS_COMUNES: 0.047,
				MECANISMO_EQUIDAD_INTERGENERACIONAL: 0.0013,
				FORMACION_PROFESIONAL: 0.001,
				DESEMPLEO: 0.0155
			},
			PLUS: {
				FESTIVO: 0.25,
				FESTIVO_ESPECIAL: 0.75,
				NOCTURNIDAD: 0.25,
				AFLUENCIA: 0.5,
				EVENTO: 3
			},
		}

		this.FORM_ELEMENTS = {
			VACACIONES: {
				DIAS: Number(document.getElementById('vacaciones').value),
				HORAS_SEMANA: Number(document.getElementById('horas-semana').value),
			},
			TURNOS: {
				CUATRO_HORAS: Number(document.getElementById('4-horas').value),
				CINCO_HORAS: Number(document.getElementById('5-horas').value),
				SEIS_Y_MEDIA_HORAS: Number(document.getElementById('6.5-horas').value),
				SIETE_HORAS: Number(document.getElementById('7-horas').value),
				OCHO_HORAS: Number(document.getElementById('8-horas').value),
				OCHO_Y_CUARTO_HORAS: Number(document.getElementById('8.25-horas').value),
			},
			HORAS: {
				FESTIVO: Number(document.getElementById('festivo').value),
				FESTIVO_ESPECIAL: Number(document.getElementById('festivo-especial').value),
				AFLUENCIA: Number(document.getElementById('plus-afluencia').value),
				EVENTO: Number(document.getElementById('evento').value),
				FORMACION: Number(document.getElementById('formacion').value),
			},
			AJUSTES: Number(document.getElementById('ajustes').value),
			OUTPUT: document.querySelector('output'),
		};

		this.SALARIO_BRUTO = {
			HORAS_LABORALES: this.fmt(this.FIXED_VALUES.PRECIO_HORA * (
				this.FORM_ELEMENTS.TURNOS.CUATRO_HORAS * 4 +
				this.FORM_ELEMENTS.TURNOS.CINCO_HORAS * 5 +
				this.FORM_ELEMENTS.TURNOS.SEIS_Y_MEDIA_HORAS * 6.5 +
				this.FORM_ELEMENTS.TURNOS.SIETE_HORAS * 7 +
				this.FORM_ELEMENTS.TURNOS.OCHO_HORAS * 8 +
				this.FORM_ELEMENTS.TURNOS.OCHO_Y_CUARTO_HORAS * 8.25
			)),
			COACHING: this.FIXED_VALUES.PRECIO_HORA,
			FORMACION: this.fmt(this.FIXED_VALUES.PRECIO_HORA * this.FORM_ELEMENTS.HORAS.FORMACION),
			EVENTO: this.fmt(this.FORM_ELEMENTS.HORAS.EVENTO * (this.FIXED_VALUES.PRECIO_HORA + this.FIXED_VALUES.PLUS.EVENTO)),
			NOCTURNIDAD:
				this.fmt(this.FIXED_VALUES.PRECIO_HORA *
					(this.FORM_ELEMENTS.TURNOS.OCHO_HORAS * this.FIXED_VALUES.PLUS.NOCTURNIDAD * 0.75 +
						this.FORM_ELEMENTS.TURNOS.OCHO_Y_CUARTO_HORAS * this.FIXED_VALUES.PLUS.NOCTURNIDAD)),
			AFLUENCIA: this.fmt(this.FORM_ELEMENTS.HORAS.AFLUENCIA * this.FIXED_VALUES.PLUS.AFLUENCIA * this.FIXED_VALUES.PRECIO_HORA),
			FESTIVO: this.fmt(this.FORM_ELEMENTS.HORAS.FESTIVO * this.FIXED_VALUES.PLUS.FESTIVO * this.FIXED_VALUES.PRECIO_HORA),
			FESTIVO_ESPECIAL: this.fmt(this.FORM_ELEMENTS.HORAS.FESTIVO_ESPECIAL * this.FIXED_VALUES.PLUS.FESTIVO_ESPECIAL * this.FIXED_VALUES.PRECIO_HORA),
			VACACIONES: this.fmt(this.FORM_ELEMENTS.VACACIONES.HORAS_SEMANA / this.FIXED_VALUES.VACACIONES.DIAS_SEMANA * this.FORM_ELEMENTS.VACACIONES.DIAS * this.FIXED_VALUES.PRECIO_HORA),
			AJUSTES: this.FORM_ELEMENTS.AJUSTES,
			TOTAL: 0,
		};

		this.COTIZACION = {
			CONTINGENCIAS_COMUNES: 0,
			MECANISMO_EQUIDAD_INTERGENERACIONAL: 0,
			FORMACION_PROFESIONAL: 0,
			DESEMPLEO: 0,
			TOTAL: 0,
		};

		this.SALARIO_NETO = 0;
	}

	fmt(number) {
		return Number(number.toFixed(2));
	}

	numberToEuro(num) {
		return new Intl.NumberFormat('es-ES', {
			style: 'currency',
			currency: 'EUR'
		}).format(num);
	}

	calcularTotal(obj) {
		const total = Object.keys(obj)
			// .filter(key => key !== 'TOTAL')
			.reduce((sum, key) => sum + obj[key], 0);
		obj.TOTAL = this.fmt(total);
	}

	calcularSalarioBruto() {
		this.calcularTotal(this.SALARIO_BRUTO);
	}

	calcularCotizaciones() {
		this.COTIZACION.CONTINGENCIAS_COMUNES = this.fmt(this.FIXED_VALUES.COTIZACION.CONTINGENCIAS_COMUNES * this.SALARIO_BRUTO.TOTAL);
		this.COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL = this.fmt(this.FIXED_VALUES.COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL * this.SALARIO_BRUTO.TOTAL);
		this.COTIZACION.FORMACION_PROFESIONAL = this.fmt(this.FIXED_VALUES.COTIZACION.FORMACION_PROFESIONAL * this.SALARIO_BRUTO.TOTAL);
		this.COTIZACION.DESEMPLEO = this.fmt(this.FIXED_VALUES.COTIZACION.DESEMPLEO * this.SALARIO_BRUTO.TOTAL);

		this.calcularTotal(this.COTIZACION);
	}

	calcularSalarioNeto() {
		this.SALARIO_NETO = this.SALARIO_BRUTO.TOTAL - this.COTIZACION.TOTAL;
	}

	imprimir() {
		this.FORM_ELEMENTS.OUTPUT.innerHTML =
			`
			<h2>Horas laborales: ${this.numberToEuro(this.SALARIO_BRUTO.HORAS_LABORALES)}.</h2>

			<h2>Pluses:</h2>

			<p>-Nocturnidad: ${this.numberToEuro(this.SALARIO_BRUTO.NOCTURNIDAD)}.</p>
			<p>-Afluencia: ${this.numberToEuro(this.SALARIO_BRUTO.AFLUENCIA)}.</p>
			<p>-Festivos: ${this.numberToEuro(this.SALARIO_BRUTO.FESTIVO)}.</p>
			<p>-Festivos especiales: ${this.numberToEuro(this.SALARIO_BRUTO.FESTIVO_ESPECIAL)}.</p>

			<h2>Otros conceptos:</h2>

			<p>-Coaching: ${this.numberToEuro(this.SALARIO_BRUTO.COACHING)}.</p>
			<p>-Formación: ${this.numberToEuro(this.SALARIO_BRUTO.FORMACION)}.</p>
			<p>-Eventos: ${this.numberToEuro(this.SALARIO_BRUTO.EVENTO)}.</p>
			<p>-Vacaciones: ${this.numberToEuro(this.SALARIO_BRUTO.VACACIONES)}.</p>
			<p>-Ajustes salariales: ${this.numberToEuro(this.SALARIO_BRUTO.AJUSTES)}.</p>

			<h2>Total Salario bruto: ${this.numberToEuro(this.SALARIO_BRUTO.TOTAL)}.</h2>

			<h2>Cotizaciones:</h2>

			<p>-Contingencias comunes: -${this.numberToEuro(this.COTIZACION.CONTINGENCIAS_COMUNES)}.</p>
			<p>-Mecanismo de equidad intergeneracional: -${this.numberToEuro(this.COTIZACION.MECANISMO_EQUIDAD_INTERGENERACIONAL)}.</p>
			<p>-Formación profesional: -${this.numberToEuro(this.COTIZACION.FORMACION_PROFESIONAL)}.</p>
			<p>-Desempleo: -${this.numberToEuro(this.COTIZACION.DESEMPLEO)}.</p>

			<h2>Total Deducciones: -${this.numberToEuro(this.COTIZACION.TOTAL)}.</h2>

			<h2>Salario neto: ${this.numberToEuro(this.SALARIO_NETO)}.</h2>
		`;
	}

	calcular() {
		this.calcularSalarioBruto();
		this.calcularCotizaciones();
		this.calcularSalarioNeto();
		this.imprimir();
	}
}

const FORM = document.querySelector('form');
FORM.onsubmit = () => new Nomina().calcular();