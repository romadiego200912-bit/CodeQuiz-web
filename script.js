const preguntas = {
    "Basico": [
        { pregunta: "¿Qué imprime print(2 + 2)?", opciones: ["3", "4", "5"], respuesta: "4" },
        { pregunta: "¿Cuál es el tipo de dato de 'Hola'?", opciones: ["int", "float", "str"], respuesta: "str" },
        { pregunta: "¿Qué símbolo se usa para comentarios?", opciones: ["//", "#", "/* */"], respuesta: "#" },
    ],
    "Intermedio": [
        { pregunta: "¿Qué estructura repite código?", opciones: ["if", "while", "def"], respuesta: "while" },
        { pregunta: "¿Qué palabra define una función?", opciones: ["func", "def", "call"], respuesta: "def" },
        { pregunta: "¿Qué tipo de dato es [1, 2, 3]?", opciones: ["lista", "tupla", "diccionario"], respuesta: "lista" },
    ],
    "Avanzado": [
        { pregunta: "¿Qué hace *args en una función?", opciones: ["Recibe varios argumentos", "Es un comentario", "Finaliza la función"], respuesta: "Recibe varios argumentos" },
        { pregunta: "¿Qué es una lambda?", opciones: ["Una variable", "Una función anónima", "Un ciclo"], respuesta: "Una función anónima" },
        { pregunta: "¿Qué hace try/except?", opciones: ["Optimiza código", "Controla errores", "Declara funciones"], respuesta: "Controla errores" },
    ]
};

let nivelActual = "";
let preguntasNivel = [];
let indice = 0;
let puntos = 0;

function mostrar(pantalla) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.add("oculto"));
    document.getElementById(pantalla).classList.remove("oculto");
}

function iniciarQuiz(nivel) {
    nivelActual = nivel;
    preguntasNivel = [...preguntas[nivel]].sort(() => Math.random() - 0.5);
    indice = 0;
    puntos = 0;

    mostrarPregunta();
    mostrar("quiz");
}

function mostrarPregunta() {
    const p = preguntasNivel[indice];

    document.getElementById("nivel").innerText = "Nivel: " + nivelActual;
    document.getElementById("pregunta").innerText = p.pregunta;

    const contenedor = document.getElementById("opciones");
    contenedor.innerHTML = "";

    p.opciones.forEach(op => {
        contenedor.innerHTML += `
            <label>
                <input type="radio" name="op" value="${op}">
                ${op}
            </label><br>
        `;
    });
}

function responder() {
    const seleccion = document.querySelector("input[name='op']:checked");

    if (!seleccion) {
        alert("Selecciona una opción");
        return;
    }

    if (seleccion.value === preguntasNivel[indice].respuesta) {
        puntos++;
    }

    indice++;

    if (indice < preguntasNivel.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById("textoResultado").innerText =
        `Aciertos: ${puntos} de ${preguntasNivel.length}`;

    mostrar("resultado");
}

function volverMenu() {
    mostrar("menu");
}
