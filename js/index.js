// Constantes de precios

const PRECIO_HORA = 10.85;

// Pluses

const PLUS_FESTIVO_ESPECIAL = PRECIO_HORA * 0.75;
const PLUS_NOCTURNIDAD = PRECIO_HORA * 0.75 * 0.25;
const PLUS_EVENTO = 3;

// Elementos del DOM

const BOTON_CALCULAR = document.querySelector('form button');
const OUTPUT = document.querySelector('form output');

const TURNOS_4_HORAS = document.getElementById('4-horas');
const TURNOS_5_HORAS = document.getElementById('5-horas');
const TURNOS_6_5_HORAS = document.getElementById('6.5-horas');
const TURNOS_7_HORAS = document.getElementById('7-horas');
const TURNOS_8_HORAS = document.getElementById('8-horas');
const FESTIVO_ESPECIAL = document.getElementById('festivo-especial');
const EVENTO = document.getElementById('evento');

const calcularSalario = () => {

	const SALARIO_4_HORAS = TURNOS_4_HORAS.value * PRECIO_HORA * 4;
	const SALARIO_5_HORAS = TURNOS_5_HORAS.value * PRECIO_HORA * 5;
	const SALARIO_6_5_HORAS = TURNOS_6_5_HORAS.value * PRECIO_HORA * 6.5;
	const SALARIO_7_HORAS = TURNOS_7_HORAS.value * PRECIO_HORA * 7;
	const SALARIO_8_HORAS = TURNOS_8_HORAS.value * PRECIO_HORA * 8 + PLUS_NOCTURNIDAD * TURNOS_8_HORAS.value;

	const SALARIO_FESTIVO_ESPECIAL = PLUS_FESTIVO_ESPECIAL * FESTIVO_ESPECIAL.value;

	const SALARIO_EVENTO = EVENTO.value * PRECIO_HORA + PLUS_EVENTO * EVENTO.value;

	const SALARIO_BRUTO = SALARIO_4_HORAS + SALARIO_5_HORAS + SALARIO_6_5_HORAS + SALARIO_7_HORAS + SALARIO_8_HORAS + SALARIO_FESTIVO_ESPECIAL + SALARIO_EVENTO;

	OUTPUT.innerHTML =
		`<p>Salario por turnos:</p>

			<p>-4 horas: ${SALARIO_4_HORAS} €.</p>
			<p>-5 horas: ${SALARIO_5_HORAS} €.</p>
			<p>-6.5 horas: ${SALARIO_6_5_HORAS} €.</p>
			<p>-7 horas: ${SALARIO_7_HORAS} €.</p>
			<p>-8 horas: ${SALARIO_8_HORAS} €.</p>
			<p>-Festivo especial: ${SALARIO_FESTIVO_ESPECIAL} €.</p>
			<p>-Eventos: ${SALARIO_EVENTO} €.</p>

			<p>Total: ${SALARIO_BRUTO} €.</p>
		`;
}

BOTON_CALCULAR.onclick = () => calcularSalario();