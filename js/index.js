// Constantes de precios

const PRECIO_HORA = 10.85;
const PRECIO_HORA_FESTIVO_ESPECIAL = PRECIO_HORA * 1.75;
const PLUS_NOCTURNIDAD = PRECIO_HORA * 0.75 * 0.25;
const PRECIO_HORA_EVENTO = PRECIO_HORA + 3;

// Elementos del DOM

const BOTON_CALCULAR = document.querySelector('form button');
const OUTPUT = document.querySelector('form output');

// Inputs de turnos

const TURNOS_4_HORAS = document.getElementById('4-horas');
const TURNOS_5_HORAS = document.getElementById('5-horas');
const TURNOS_6_5_HORAS = document.getElementById('6.5-horas');
const TURNOS_7_HORAS = document.getElementById('7-horas');
const TURNOS_8_HORAS = document.getElementById('8-horas');

const calcularSalario = () => {
	const SALARIO_4_HORAS = TURNOS_4_HORAS.value * PRECIO_HORA * 4;
	const SALARIO_5_HORAS = TURNOS_5_HORAS.value * PRECIO_HORA * 5;
	const SALARIO_6_5_HORAS = TURNOS_6_5_HORAS.value * PRECIO_HORA * 6.5;
	const SALARIO_7_HORAS = TURNOS_7_HORAS.value * PRECIO_HORA * 7;
	const SALARIO_8_HORAS = TURNOS_8_HORAS.value * PRECIO_HORA * 8 + PLUS_NOCTURNIDAD * TURNOS_8_HORAS.value;
	const SALARIO_BRUTO = SALARIO_4_HORAS + SALARIO_5_HORAS + SALARIO_6_5_HORAS + SALARIO_7_HORAS + SALARIO_8_HORAS;

	OUTPUT.innerHTML =
		`Salario por turnos:
			-4 horas: ${SALARIO_4_HORAS} €.
			-5 horas: ${SALARIO_5_HORAS} €.
			-6.5 horas: ${SALARIO_6_5_HORAS} €.
			-7 horas: ${SALARIO_7_HORAS} €.
			-8 horas: ${SALARIO_8_HORAS} €.

			Total: ${SALARIO_BRUTO} €.
		`;
}

BOTON_CALCULAR.onclick = () => calcularSalario();