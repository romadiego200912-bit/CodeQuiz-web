// ------------------------------
// Banco de preguntas (10 por nivel)
// ------------------------------
const preguntas = {
    "Basico": [
        { pregunta: "¿Qué imprime print(2 + 2)?", opciones: ["3", "4", "5"], respuesta: "4" },
        { pregunta: "¿Cuál es el tipo de dato de 'Hola'?", opciones: ["int", "float", "str"], respuesta: "str" },
        { pregunta: "¿Qué símbolo se usa para comentarios?", opciones: ["//", "#", "/* */"], respuesta: "#" },
        { pregunta: "¿Qué imprime print(10 / 2)?", opciones: ["2", "5", "20"], respuesta: "5" },
        { pregunta: "¿Qué función sirve para obtener la longitud de un texto?", opciones: ["count()", "size()", "len()"], respuesta: "len()" },
        { pregunta: "¿Cuál es el tipo de dato de 10?", opciones: ["str", "int", "bool"], respuesta: "int" },
        { pregunta: "¿Qué imprime print(True)?", opciones: ["true", "True", "1"], respuesta: "True" },
        { pregunta: "¿Qué operador se usa para multiplicar?", opciones: ["x", "*", "**"], respuesta: "*" },
        { pregunta: "¿Cómo se declara una variable?", opciones: ["var x = 5", "x = 5", "int x = 5"], respuesta: "x = 5" },
        { pregunta: "¿Cuál es el tipo de dato de 3.14?", opciones: ["int", "float", "str"], respuesta: "float" }
    ],

    "Intermedio": [
        { pregunta: "¿Qué estructura repite código?", opciones: ["if", "while", "def"], respuesta: "while" },
        { pregunta: "¿Qué palabra define una función?", opciones: ["func", "def", "call"], respuesta: "def" },
        { pregunta: "¿Qué tipo de dato es [1, 2, 3]?", opciones: ["lista", "tupla", "diccionario"], respuesta: "lista" },
        { pregunta: "¿Qué significa 'elif'?", opciones: ["Else if", "Else function", "End loop"], respuesta: "Else if" },
        { pregunta: "¿Qué operador verifica si un elemento está en una lista?", opciones: ["in", "has", "contains"], respuesta: "in" },
        { pregunta: "¿Qué tipo de dato es (1, 2, 3)?", opciones: ["lista", "tupla", "set"], respuesta: "tupla" },
        { pregunta: "¿Cómo se agrega un elemento a una lista?", opciones: ["add()", "append()", "push()"], respuesta: "append()" },
        { pregunta: "¿Qué imprime len([1,2,3,4])?", opciones: ["3", "4", "5"], respuesta: "4" },
        { pregunta: "¿Qué tipo de dato es {'a':1, 'b':2}?", opciones: ["diccionario", "lista", "set"], respuesta: "diccionario" },
        { pregunta: "¿Qué método convierte un texto a mayúsculas?", opciones: ["upper()", "uppercase()", "big()"], respuesta: "upper()" }
    ],

    "Avanzado": [
        { pregunta: "¿Qué hace *args en una función?", opciones: ["Recibe varios argumentos", "Es un comentario", "Finaliza la función"], respuesta: "Recibe varios argumentos" },
        { pregunta: "¿Qué es una lambda?", opciones: ["Una variable", "Una función anónima", "Un ciclo"], respuesta: "Una función anónima" },
        { pregunta: "¿Qué hace try/except?", opciones: ["Optimiza código", "Controla errores", "Declara funciones"], respuesta: "Controla errores" },
        { pregunta: "¿Qué palabra se utiliza para crear una clase?", opciones: ["class", "object", "struct"], respuesta: "class" },
        { pregunta: "¿Qué método devuelve las claves de un diccionario?", opciones: ["keys()", "items()", "values()"], respuesta: "keys()" },
        { pregunta: "¿Qué hace **kwargs?", opciones: ["Recibe argumentos nombrados", "Convierte variables", "Limpia memoria"], respuesta: "Recibe argumentos nombrados" },
        { pregunta: "¿Qué es un decorador?", opciones: ["Una variable", "Una función que modifica otra función", "Un comentario especial"], respuesta: "Una función que modifica otra función" },
        { pregunta: "¿Qué hace 'yield' en una función?", opciones: ["Finaliza la función", "Convierte en generador", "Crea una clase"], respuesta: "Convierte en generador" },
        { pregunta: "¿Qué estructura permite herencia múltiple?", opciones: ["Clases", "Funciones", "Listas"], respuesta: "Clases" },
        { pregunta: "¿Qué significa POO?", opciones: ["Programación Orientada a Objetos", "Proceso Operativo Optimo", "Programa Ordenado Oficial"], respuesta: "Programación Orientada a Objetos" }
    ]
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
