// Opciones y datos solo para Home
const options = [
  "1 Libro y 2 Elementos",
  "2 Libros y 1 Elemento",
  "3 Elementos",
  "3 Libros",
];
const booksES = [
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
  "El Paramo",
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
  "Era Abisal",
  "Era Multiverso",
  "Era Alpina",
  "Era Histórica",
  "Era Primitiva",
  "Era Conspiradora",
];
const booksLAT = [
  "Mecánico",
  "Legiones Malignas",
  "Dragon",
  "Legiones Benévolas",
  "Espíritus",
  "Invierno",
  "Alado",
  "Mujer",
  "No Muerto",
  "Villanos",
  "Aventureros",
  "Exclusivo",
  "Familias",
  "Mar",
  "Superhéroes",
  "Inframundo",
  "Elementales",
  "Zoomorfos",
  "Portadores",
  "Guerras De Equipo",
  "Elite",
  "Carrera",
  "Misión",
  "Nórdicos",
  "Reinos Libres",
  "Festividades",
  "Nueva Onda",
  "Antiguos Guardias Marinos",
  "Monstelvania",
  "Abominaciones",
  "Civilizaciones Cósmicas",
  "Defensores Espaciales",
  "Viajeros De Las Estrellas",
  "Gaia Pura",
  "Corte Honesta",
  "Gremio De Aventureros",
  "Guarida De Almas",
  "Dojo De Furia",
  "Gaia Malvada",
  "Dojo De Honor",
  "Páramos",
  "Patrulla De Elektra",
  "El Sindicato",
  "Escuadrón De Venganza",
  "Moradores Del Inframundo",
  "Barbaros",
  "Consejo De Magia",
  "Paraíso Celestial",
  "Ciudadanos",
  "Saurianos",
  "Liga De Cazadores",
  "Piratas De Petra",
  "Cuchillas Oscuras",
  "Fuerzas Ardientes",
  "Cimas Rocosas",
  "Era Mítica Original",
  "Era Cósmica",
  "Era Corrupta",
  "Era Metropolitana",
  "Era Del Juicio Final",
  "Era Silvestre",
  "Era Galáctica",
  "Era Abisal",
  "Era Multiverso",
  "Era Alpina",
  "Era Histórica",
  "Era Feral",
  "Era Conspirativa",
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

let assignedOptions = [];

// Cargar resultados previos
function loadResults() {
  const resultTable = document.querySelector("#result-table tbody");
  if (!resultTable) return;
  const results = JSON.parse(localStorage.getItem("pvpml_results")) || [];
  resultTable.innerHTML = "";
  results.forEach((cols) => {
    const row = document.createElement("tr");
    row.innerHTML = cols.map((col) => `<td>${col}</td>`).join("");
    resultTable.appendChild(row);
  });
}

// Llama a esta función al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  loadResults();
});

// Guardar resultados
function saveResults() {
  const rows = Array.from(document.querySelectorAll("#result-table tbody tr"));
  const results = rows.map((row) =>
    Array.from(row.children).map((cell) => cell.innerHTML)
  );
  localStorage.setItem("pvpml_results", JSON.stringify(results));
}

// Validar input de nombre
function validateInput() {
  const usernameInput = document.getElementById("username");
  const validationMsg = document.getElementById("validation-message");
  const assignMsg = document.getElementById("assign-message");
  if (!usernameInput) return false;
  const username = usernameInput.value;
  const valid = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(username.trim());

  if (validationMsg && assignMsg) {
    if (valid) {
      validationMsg.style.display = "none";
    } else {
      validationMsg.style.display = "block";
      validationMsg.textContent = "Nombre inválido. Solo letras y espacios.";
      assignMsg.style.display = "none";
    }
  }
  return valid;
}

function hideMessages() {
  const validationMsg = document.getElementById("validation-message");
  const assignMsg = document.getElementById("assign-message");
  if (validationMsg) validationMsg.style.display = "none";
  if (assignMsg) assignMsg.style.display = "none";
}

// Evento: Modo de Lucha
const modeFightingBtn = document.getElementById("mode-fighting");
if (modeFightingBtn) {
  modeFightingBtn.addEventListener("click", () => {
    hideMessages();
    const usernameInput = document.getElementById("username");
    const recordCountInput = document.getElementById("record-count");
    if (!usernameInput || !recordCountInput) return;
    const username = usernameInput.value.trim();
    let recordCount = parseInt(recordCountInput.value);
    if (isNaN(recordCount) || recordCount < 1) recordCount = 1;
    if (!username || !validateInput()) {
      const validationMsg = document.getElementById("validation-message");
      if (validationMsg) {
        validationMsg.style.display = "block";
        validationMsg.textContent = "Debe ingresar un nombre válido.";
      }
      return;
    }
    assignedOptions = [];
    for (let i = 0; i < recordCount; i++) {
      const randomOption = options[Math.floor(Math.random() * options.length)];
      assignedOptions.push(randomOption);
      const now = new Date().toLocaleString();
      const entry = `${now} - ${username} - Modo de Lucha - ${randomOption}`;
    }
    const assignMsg = document.getElementById("assign-message");
    if (assignMsg) {
      assignMsg.style.display = "block";
      assignMsg.textContent =
        'La asignación se realizó con éxito, por favor seleccione el botón "Buscar Suerte" para visualizar los resultados.';
    }
  });
}

// Evento: Buscar Suerte
const searchLuckBtn = document.getElementById("search-luck");
if (searchLuckBtn) {
  searchLuckBtn.addEventListener("click", () => {
    hideMessages();
    const usernameInput = document.getElementById("username");
    const recordCountInput = document.getElementById("record-count");
    if (!usernameInput || !recordCountInput) return;
    const username = usernameInput.value.trim();
    let recordCount = parseInt(recordCountInput.value);
    if (isNaN(recordCount) || recordCount < 1) recordCount = 1;
    if (!username || !validateInput()) {
      const validationMsg = document.getElementById("validation-message");
      if (validationMsg) {
        validationMsg.style.display = "block";
        validationMsg.textContent = "Debe ingresar un nombre válido.";
      }
      return;
    }
    if (assignedOptions.length === 0) {
      const assignMsg = document.getElementById("assign-message");
      if (assignMsg) {
        assignMsg.style.display = "block";
        assignMsg.textContent = 'Primero selecciona el botón "Modo de Lucha".';
      }
      return;
    }
    let items = [];
    for (let i = 0; i < assignedOptions.length; i++) {
      const selectedOption = assignedOptions[i];
      switch (selectedOption) {
        case options[0]:
          items = [...getRandom(currentBooks, 1), ...getRandom(elements, 2)];
          break;
        case options[1]:
          items = [...getRandom(currentBooks, 2), ...getRandom(elements, 1)];
          break;
        case options[2]:
          items = getRandom(elements, 3);
          break;
        case options[3]:
          items = getRandom(currentBooks, 3);
          break;
      }
      const now = new Date().toLocaleString();
      const entry = `${now} - ${username} - Buscar Suerte - ${items.join(", ")}`;
      const resultTable = document.querySelector("#result-table tbody");
      if (resultTable) {
        const row = document.createElement("tr");
        const rowCount =
          document.querySelectorAll("#result-table tbody tr").length + 1;

        row.innerHTML = `
          <td>${rowCount}</td>
          <td>${username}</td>
          <td>${selectedOption}</td>
          ${items
            .map(
              (item) =>
                `<td><img src="${getIcon(item)}" alt="${item}" data-tooltip="${item}" style="width: 1.5rem; height: 1.5rem;" /></td>`
            )
            .join("")}
        `;
        resultTable.appendChild(row);
        saveResults(); // Guarda los resultados en localStorage
      }
    }
    if (usernameInput) usernameInput.value = "";
    if (recordCountInput) recordCountInput.value = "";
    assignedOptions = [];
  });
}

// Evento: Limpiar resultados
const clearResultsBtn = document.getElementById("clear-results");
if (clearResultsBtn) {
  clearResultsBtn.addEventListener("click", () => {
    const usernameInput = document.getElementById("username");
    const recordCountInput = document.getElementById("record-count");
    const resultTable = document.querySelector("#result-table tbody");
    if (usernameInput) usernameInput.value = "";
    if (recordCountInput) recordCountInput.value = "";
    if (resultTable) resultTable.innerHTML = "";
    localStorage.removeItem("pvpml_results"); // Elimina los resultados de localStorage
    hideMessages();
    assignedOptions = [];
  });
}

// Utilidad para obtener elementos aleatorios
function getRandom(arr, n) {
  return arr.sort(() => 0.5 - Math.random()).slice(0, n);
}

// Función para obtener la ruta del ícono correspondiente
function getIcon(name) {
  const sanitizedName = name.replace(/\s+/g, "_"); // Reemplaza espacios por guiones bajos
  return `/img/${sanitizedName}.png`; // Ruta del ícono
}

// Elementos del idioma
const languageToggle = document.getElementById("language-toggle");
const languageMenu = document.getElementById("language-menu");
const languageOptions = document.querySelectorAll(".language-option");

// Mostrar/ocultar menú del Idioma
languageToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // Evita que el clic en el botón cierre el menú
  const isMenuVisible = languageMenu.style.display === "block";
  languageMenu.style.display = isMenuVisible ? "none" : "block";
});

// Cerrar el menú al hacer clic fuera de él
document.addEventListener("click", (e) => {
  if (!languageMenu.contains(e.target) && !languageToggle.contains(e.target)) {
    languageMenu.style.display = "none";
  }
});

// Cambiar idioma al seleccionar una opción
languageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const selectedLang = option.getAttribute("data-lang");
    currentBooks = selectedLang === "lat" ? booksLAT : booksES;
    localStorage.setItem("pvpml_language", selectedLang);
    languageMenu.style.display = "none"; // Ocultar el menú después de seleccionar
  });
});

// Cargar preferencia guardada
const savedLanguage = localStorage.getItem("pvpml_language");
if (savedLanguage) {
  currentBooks = savedLanguage === "lat" ? booksLAT : booksES;
}

document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "IMG" && target.hasAttribute("data-tooltip")) {
    const tooltipText = target.getAttribute("data-tooltip");

    // Crear el tooltip
    const tooltip = document.createElement("div");
    tooltip.textContent = tooltipText;
    tooltip.style.position = "absolute";
    tooltip.style.background = "#333";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "5px 10px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.fontSize = "0.9rem";
    tooltip.style.zIndex = "1000";
    tooltip.style.opacity = "0";
    tooltip.style.transition = "opacity 0.3s ease";
    document.body.appendChild(tooltip);

    // Posicionar el tooltip cerca del ícono
    const rect = target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.top + window.scrollY - 30}px`;

    // Mostrar el tooltip
    setTimeout(() => {
      tooltip.style.opacity = "1";
    }, 10);

    // Desvanecer y eliminar el tooltip después de unos segundos
    setTimeout(() => {
      tooltip.style.opacity = "0";
      setTimeout(() => {
        tooltip.remove();
      }, 300); // Tiempo para que desaparezca completamente
    }, 2000); // Tiempo que el tooltip permanece visible
  }
});