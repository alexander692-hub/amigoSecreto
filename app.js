// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let participantes = [];

// Obtener los elementos de los botones
const botonAdd = document.querySelector(".button-add");
const botonSortear = document.querySelector(".button-draw");
const botonReset = document.querySelector(".button-reset");

// Funcion para verificar el estado del input
function verificarInput() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    if (nombre === "") {
        botonAdd.classList.remove("active");
        botonAdd.classList.add("inactive");
    } else {
        botonAdd.classList.remove("inactive");
        botonAdd.classList.add("active");
    }
}

// Agregar el evento de input para verificar el estado al escribir
document.getElementById("amigo").addEventListener("input", verificarInput);

// Función para agregar amigos a la lista
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    const nombreValido = /^[a-zA-Z\s]+$/.test(nombre); // Validar solo letras y espacios

    if (nombre === "") {
        alert("Por favor, ingresa un nombre.");
    } else if (!nombreValido) {
        alert("Caracteres invalidos. Por favor, ingresa solo letras y espacios.");
        input.value = ""; // Borrar el nombre ingresado
    } else if (participantes.includes(nombre)) {
        alert("El nombre ya esta en la lista. Por favor, ingresa un nombre diferente.");
        input.value = ""; // Borrar el nombre ingresado
    } else {
        participantes.push(nombre);
        mostrarLista();
        input.value = "";
        verificarInput(); // Verificar el input despues de agregar un amigo
    }
}

// Funcion para mostrar la lista de amigos
function mostrarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    participantes.forEach((nombre) => {
        const li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

// Funcion para mezclar la lista de participantes
function mezclar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
}

// Funcion para sortear un amigo secreto
function sortearAmigo() {
    if (participantes.length < 1) {
        alert("Necesitas al menos 1 participante para sortear un nombre.");
        return;
    }

    let mezclados = mezclar([...participantes]);
    let nombreSorteado = mezclados[0]; // Selecciona el primer nombre despues de mezclar

    mostrarResultado(nombreSorteado);
    desactivarBotones(); // Desactivar los botones despues de realizar el sorteo

    // Limpiar y deshabilitar el campo de entrada
    const input = document.getElementById("amigo");
    input.value = "";
    input.disabled = true;
}

// Funcion para mostrar el resultado del sorteo
function mostrarResultado(nombre) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    const li = document.createElement("li");
    li.textContent = `El amigo secreto sorteado es: ${nombre}`;
    resultado.appendChild(li);
}

// Funcion para desactivar los botones
function desactivarBotones() {
    botonSortear.disabled = true;
    botonSortear.style.cursor = "not-allowed";
    botonSortear.style.backgroundColor = "#a1a1a1"; // Cambia el color del boton a inactivo

    botonAdd.disabled = true;
    botonAdd.style.cursor = "not-allowed";
    botonAdd.style.backgroundColor = "#a1a1a1"; // Cambia el color del boton a inactivo
}

// Funcion para reiniciar el juego
function reiniciarJuego() {
    participantes = [];
    mostrarLista();
    document.getElementById("resultado").innerHTML = "";

    // Reactivar botones y habilitar el campo de entrada
    botonSortear.disabled = false;
    botonSortear.style.cursor = "pointer";
    botonSortear.style.backgroundColor = "var(--color-button)";

    botonAdd.disabled = false;
    botonAdd.style.cursor = "pointer";
    botonAdd.style.backgroundColor = "var(--color-tertiary)";

    const input = document.getElementById("amigo");
    input.disabled = false;
}
