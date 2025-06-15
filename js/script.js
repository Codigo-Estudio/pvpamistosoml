// Configuración de mensajes y etiquetas
const labels = {
  modeFighting: "Modo de Lucha",
  searchLuck: "Buscar Suerte",
  clearResults: "Limpiar resultados",
};

const messages = {
  invalidName: "Debe ingresar un nombre válido.",
  noOption: `Primero selecciona el botón "${labels.modeFighting}".`,
  assignSuccess: `La asignación se realizó con éxito, por favor seleccione el botón "${labels.searchLuck}" para visualizar los resultados.`,
  fieldType: "Nombre inválido. Solo letras y espacios.",
  logTitle: "Registro de actividad",
};

const motivationalPhrases = [
  "En este campo de batalla, solo los decididos avanzan.",
  "No es suerte, es estrategia. Demuestra de qué estás hecho.",
  "Cada decisión cuenta. Solo los valientes dominan el juego.",
  "El terreno no perdona a los débiles. ¿Estás listo para vencer?",
  "El tiempo corre. Solo uno será el último en pie.",
  "Tu rival no es el otro... es tu límite. Supéralo.",
  "Esta no es una prueba, es un golpe de realidad.",
  "No hay segundas oportunidades en este duelo. Da tu mejor golpe.",
  "Los titanes no nacen... se forjan aquí.",
];

const tableHeaders = [
  "#",
  "Usuario",
  "Opción",
  "Resultado 1",
  "Resultado 2",
  "Resultado 3",
];

const options = [
  "1 Libro y 2 Elementos",
  "2 Libros y 1 Elemento",
  "3 Elementos",
  "3 Libros",
];

// ===== Datos iniciales =====
const books = [
  "Mecánicos",
  "Legiones Del Mal",
  "Dragones",
  "Legiones Del Bien",
  "Espíritus",
  "Invierno",
  "Alados",
  "Monstruas",
  "No Muertos",
  "Villanos",
  "Aventureros",
  "Exclusivo",
  "Familias",
  "Marinos",
  "Superhéroes",
  "Inframundo",
  "Elementales",
  "Zoomorfos",
  "Portadores",
  "Guerras De Equipo",
  "Elite",
  "Carrera",
  "Misión",
  "Moradores De Las Cimas",
  "Reinos Libres",
  "Festividades",
  "Nueva Oleada",
  "Vieja Guardia Marina",
  "Monstelvania",
  "Abominaciones",
  "Civilizaciones Del Cosmos",
  "Defensores Del Espacio",
  "Navegantes Estelares",
  "Gaia Pura",
  "Corte Justa",
  "Gremio De Los Aventureros",
  "Guardia De Almas",
  "Dojo De Furia",
  "Gaia Malvada",
  "Dojo De Honor",
  "El Páramo",
  "Patrulla Elektra",
  "El Sindicato",
  "Escuadrón Vengativo",
  "Moradores Del Inframundo",
  "Barbaros",
  "Consejo Mágico",
  "Paraíso Celestial",
  "Ciudadanos",
  "Saurios",
  "Liga De Cazadores",
  "Piratas De Petra",
  "Cuchillas Tenebrosas",
  "Fuerzas Ardientes",
  "Picos Montañosos",
  "Era Mítica Original",
  "Era Cósmica",
  "Era Corrupta",
  "Era Metropolitana",
  "Era Apocalíptica",
  "Era Silvestre",
  "Era Galáctica",
  "Era Abismal",
  "Era Multiverso",
  "Era Alpina",
  "Era Histórica",
  "Era Primitiva",
  "Era Conspiradora",
];
const elements = [
  "Fuego",
  "Natura",
  "Magia",
  "Metal",
  "Luz",
  "Tinieblas",
  "Tierra",
  "Trueno",
  "Agua",
];

let selectedOption = null; // Opción aleatoria asignada
const logEntries = []; // Array para el registro

// ===== Función para tomar n elementos aleatorios de un array =====
function getRandom(arr, n) {
  return arr.sort(() => 0.5 - Math.random()).slice(0, n);
}

// ===== Validar input de nombre: solo letras y espacios =====
function validateInput() {
  const username = document.getElementById("username").value;
  const valid = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(username.trim());
  const validationMsg = document.getElementById("validation-message");
  const assignMsg = document.getElementById("assign-message");

  if (valid) {
    validationMsg.style.display = "none"; // Oculta mensaje si válido
  } else {
    validationMsg.style.display = "block"; // Muestra error si inválido
    validationMsg.textContent = messages.fieldType; // Mensaje de error por el campo
    assignMsg.style.display = "none"; // Oculta otros mensajes
  }
  return valid;
}

// ===== Ocultar todos los mensajes de alerta =====
function hideMessages() {
  document.getElementById("validation-message").style.display = "none";
  document.getElementById("assign-message").style.display = "none";
}

// ===== Modo de Lucha aleatoria =====
let assignedOptions = []; // Crear un arreglo global para almacenar las opciones asignadas

document.getElementById("mode-fighting").addEventListener("click", () => {
  hideMessages(); // Limpia mensajes anteriores
  const username = document.getElementById("username").value.trim();

  let recordCount = parseInt(document.getElementById("record-count").value); // campo de registros
  if (isNaN(recordCount) || recordCount < 1) recordCount = 1; // valor por defecto si no es válido

  // Validación de nombre antes de asignar
  if (!username || !validateInput()) {
    const validationMsg = document.getElementById("validation-message");
    validationMsg.style.display = "block";
    validationMsg.textContent = messages.invalidName;
    return;
  }

  // Limpiar el arreglo de opciones antes de asignar nuevos valores
  assignedOptions = [];

  // Asignar múltiples opciones aleatorias
  for (let i = 0; i < recordCount; i++) {
    const randomOption = options[Math.floor(Math.random() * options.length)];
    assignedOptions.push(randomOption); // Guardar cada opción en el arreglo

    const now = new Date().toLocaleString();
    const entry = `${now} - ${username} - ${labels.modeFighting} - ${randomOption}`;
    logEntries.push(entry);
    const li = document.createElement("li");
    li.textContent = entry;
    document.getElementById("log-list").appendChild(li);
  }

  // Mensaje de éxito editable
  const assignMsg = document.getElementById("assign-message");
  assignMsg.style.display = "block";
  assignMsg.textContent = messages.assignSuccess;
});

// ===== Buscar Suerte tras la opción asignada =====
document.getElementById("search-luck").addEventListener("click", () => {
  hideMessages();
  const username = document.getElementById("username").value.trim();

  let recordCount = parseInt(document.getElementById("record-count").value); // nuevo campo
  if (isNaN(recordCount) || recordCount < 1) recordCount = 1; // por defecto 1

  // Re-validar nombre antes de generar
  if (!username || !validateInput()) {
    const validationMsg = document.getElementById("validation-message");
    validationMsg.style.display = "block";
    validationMsg.textContent = messages.invalidName;
    return;
  }

  // Si no hay opción, muestra alerta
  if (assignedOptions.length === 0) {
    const assignMsg = document.getElementById("assign-message");
    assignMsg.style.display = "block";
    assignMsg.textContent = messages.noOption;
    return;
  }

  // Según la opción asignada, selecciona libros y/o elementos
  let items = [];
  for (let i = 0; i < assignedOptions.length; i++) {
    const selectedOption = assignedOptions[i];
    switch (selectedOption) {
      case options[0]: // "1 Libro y 2 Elementos"
        items = [...getRandom(books, 1), ...getRandom(elements, 2)];
        break;
      case options[1]: // "2 Libros y 1 Elemento"
        items = [...getRandom(books, 2), ...getRandom(elements, 1)];
        break;
      case options[2]: // "3 Elementos"
        items = getRandom(elements, 3);
        break;
      case options[3]: // "3 Libros"
        items = getRandom(books, 3);
        break;
    }

    // Registra fecha, usuario, opción y resultados en el log
    const now = new Date().toLocaleString();
    const resultText = items.join(", ");
    const entry = `${now} - ${username} - ${labels.searchLuck} - ${resultText}`;
    logEntries.push(entry);
    const li = document.createElement("li");
    li.textContent = entry;
    document.getElementById("log-list").appendChild(li);

    // Inserta fila en la tabla de resultados
    const row = document.createElement("tr");
    const rowCount =
      document.querySelectorAll("#result-table tbody tr").length + 1; // Calcula número de fila
    row.innerHTML = `
        <td>${rowCount}</td>
        <td>${username}</td>
        <td>${selectedOption}</td>
        <td>${items[0] || ""}</td>
        <td>${items[1] || ""}</td>
        <td>${items[2] || ""}</td>
      `;
    document.querySelector("#result-table tbody").appendChild(row);
  }

  // Limpia campos para el siguiente usuario
  document.getElementById("username").value = "";
  // Limpiar el campo de registros
  document.getElementById("record-count").value = "";
  assignedOptions = []; // Limpiar las opciones asignadas al finalizar
});

// ===== Limpiar la tabla de resultados =====
document.getElementById("clear-results").addEventListener("click", () => {
  // Limpiar el campo de Nombre del usuario
  document.getElementById("username").value = "";
  // Limpiar el campo de Registros
  document.getElementById("record-count").value = "";
  // Limpiar otros registros de la tabla
  document.querySelector("#result-table tbody").innerHTML = "";
  // Ocultar mensajes de alerta si están visibles
  document.getElementById("validation-message").style.display = "none";
  document.getElementById("assign-message").style.display = "none";
  // Limpiar las opciones asignadas al finalizar
  assignedOptions = [];
});

// Toggle que añade/quita la clase 'open' para expandir/colapsar
document.getElementById("menu-toggle").addEventListener("click", (e) => {
  e.stopPropagation(); // Evita que el clic se propague
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});

//——— Toggle modo oscuro ———
const darkToggle = document.getElementById("dark-mode-toggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Cambiar ícono y título según el modo
  const isDark = document.body.classList.contains("dark");
  darkToggle.textContent = isDark ? "☀️" : "🌙";
  darkToggle.title = isDark ? "Modo claro" : "Modo oscuro"; // Actualiza el tooltip
  // Cerrar el menú si está abierto
  const menu = document.getElementById("menu");
  menu.classList.remove("open");
});

// Cierra el menú al hacer clic fuera del contenedor del menú
document.addEventListener("click", (e) => {
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menu-toggle");
  // Cierra el menú solo si el clic no es sobre el menú, el botón hamburguesa
  if (!menu.contains(e.target) && !toggle.contains(e.target)) {
    menu.style.display = "none";
  }
});

// Navegación entre secciones y cierre del menú
function navigate(section) {
  document.getElementById("home").style.display =
    section === "home" ? "block" : "none";
  document.getElementById("log").style.display =
    section === "log" ? "block" : "none";
  document.getElementById("menu").style.display = "none"; // Cierra menú al navegar
}

// Frases motivacionales desde la constante independiente
const footerElement = document.getElementById("motivational-footer");

let lastPhrase = "";

function getRandomPhrase() {
  let newPhrase;
  do {
    newPhrase =
      motivationalPhrases[
        Math.floor(Math.random() * motivationalPhrases.length)
      ];
  } while (newPhrase === lastPhrase);
  lastPhrase = newPhrase;
  return newPhrase;
}

setInterval(() => {
  footerElement.style.opacity = 0;

  setTimeout(() => {
    footerElement.textContent = getRandomPhrase();
    footerElement.style.opacity = 1;
  }, 500);
}, 5000);
