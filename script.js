// ------------------------------
// Banco de preguntas (5 por nivel)
// ------------------------------
const preguntas = {
    "Basico": [
       { pregunta: "¿Qué tipo de dato es la variable nombre = \"Luis\"?",  opciones: ["int", "str", "float"],  respuesta: "str" },
       { pregunta: "¿Qué tipo de dato es edad = 16?", opciones: ["float", "bool", "int"], respuesta: "int"},
       { pregunta: "¿Qué tipo de dato es promedio = 8.5?", opciones: ["float", "int", "str"], respuesta: "float" },
       { pregunta: "¿Qué tipo de dato es aprobado = True?", opciones: ["str", "bool", "int"], respuesta: "bool" },
       { pregunta: "En materias = [\"Mate\", \"Historia\", \"Inglés\"], ¿qué tipo de estructura es materias?", opciones: ["tuple", "list", "str"], respuesta: "list" },
    ],

    "Intermedio": [
        { pregunta: "¿Para qué se utiliza la estructura if en Python?", opciones: ["Para repetir un bloque de código", "Para ejecutar una acción si se cumple una condición", "Para crear una variable"], respuesta: "Para ejecutar una acción si se cumple una condición" },
        { pregunta: "¿Qué palabra se usa para evaluar una segunda condición si la primera no se cumple?", opciones: ["then", "else if", "elif"], respuesta: "elif" },
        { pregunta: "¿Qué operador se usa para indicar mayor que?", opciones: ["<", ">", "="], respuesta: ">" },
        { pregunta: "¿Qué operador se usa para indicar menor que?", opciones: [">", "<", "=="], respuesta: "<" },
        { pregunta: "¿Cuándo se ejecuta la instrucción else?", opciones: ["Cuando la condición del if es verdadera", "Cuando ninguna de las condiciones anteriores se cumple", "Siempre se ejecuta"], respuesta: "Cuando ninguna de las condiciones anteriores se cumple" },
    ],

    "Avanzado": [
        { pregunta: "¿Para qué se utiliza el ciclo while en Python?", opciones: ["Para repetir un bloque de código mientras se cumpla una condición", "Para definir una función", "Para imprimir en pantalla"], respuesta: "Para repetir un bloque de código mientras se cumpla una condición" },
        { pregunta: "¿Qué ciclo se usa cuando se conoce la cantidad exacta de repeticiones?", opciones: ["while", "if", "for"], respuesta: "for" },
        { pregunta: "¿Qué palabra complementa una condición cuando no se cumple el if?", opciones: ["elif", "else", "while"], respuesta: "else" },
        { pregunta: "Si en una estructura if se evalúa 5 + 3 > 6, ¿qué ocurre?", opciones: ["La condición es verdadera", "La condición es falsa", "Genera error"], respuesta: "La condición es verdadera" },
        { pregunta: "En un ciclo while con la condición contador < 3, si contador inicia en 0 y aumenta de 1 en 1, ¿cuántas veces se ejecuta el ciclo?", opciones: ["2 veces", "3 veces", "4 veces"], respuesta: "3 veces" },
   ],
};

let nivelActual = "";
let preguntasNivel = [];
let indice = 0;
let puntos = 0;

// ⏱️ Tiempo total del quiz
let tiempoTotal = 0;
let cronometroGeneral = null;
let relojEl = null;

function mostrar(pantalla) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.add("oculto"));
    const el = document.getElementById(pantalla);
    if (el) el.classList.remove("oculto");
}

function iniciarQuiz(nivel) {
    nivelActual = nivel;

    if (!preguntas[nivel] || preguntas[nivel].length === 0) {
        alert("No hay preguntas disponibles para este nivel.");
        return;
    }

    preguntasNivel = [...preguntas[nivel]].sort(() => Math.random() - 0.5);

    indice = 0;
    puntos = 0;

    tiempoTotal = 0;
    relojEl = document.getElementById("reloj");
    relojEl.innerText = "Tiempo: 0s";

    if (cronometroGeneral) clearInterval(cronometroGeneral);
    cronometroGeneral = setInterval(() => {
        tiempoTotal++;
        relojEl.innerText = `Tiempo: ${formatearTiempo(tiempoTotal)}`;
    }, 1000);

    mostrarPregunta();
    mostrar("quiz");
}

function mostrarPregunta() {
    const p = preguntasNivel[indice];
    if (!p) {
        clearInterval(cronometroGeneral);
        mostrarResultado();
        return;
    }

    document.getElementById("nivel").innerText = "Nivel: " + nivelActual;
    document.getElementById("pregunta").innerText = p.pregunta;

    const contenedor = document.getElementById("opciones");
    contenedor.innerHTML = "";

    p.opciones.forEach((op, i) => {
        const id = `op_${i}`;
        const wrapper = document.createElement("label");
        wrapper.innerHTML = `<input type="radio" name="op" value="${op}" id="${id}"> ${op}`;
        contenedor.appendChild(wrapper);
        contenedor.appendChild(document.createElement("br"));
    });
}

function responder() {
    const seleccion = document.querySelector("input[name='op']:checked");

    if (!seleccion) {
        alert("Selecciona una opción");
        return;
    }

    // Comparación segura
    const valor = seleccion.value.trim().toLowerCase();
    const correcto = preguntasNivel[indice].respuesta.trim().toLowerCase();

    if (valor !== correcto) {
        alert("❌ Respuesta incorrecta — intenta de nuevo");
        return;
    }

    // ✔ Correcta
    puntos++;
    indice++;

    if (indice < preguntasNivel.length) {
        mostrarPregunta();
    } else {
        clearInterval(cronometroGeneral);
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById("textoResultado").innerText =
        `Aciertos: ${puntos} de ${preguntasNivel.length}`;

    document.getElementById("tiempoFinal").innerText =
        `Tiempo total: ${formatearTiempo(tiempoTotal)}`;

    mostrar("resultado");
}

function volverMenu() {
    clearInterval(cronometroGeneral);
    mostrar("menu");
}

function formatearTiempo(segundos) {
    const s = Number(segundos);
    if (s < 60) return `${s}s`;
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}m ${sec}s`;
}
