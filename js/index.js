// Opciones y datos solo para Home
const options = [
  "1 Libro y 2 Elementos",
  "2 Libros y 1 Elemento",
  "3 Elementos",
  "3 Libros",
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

const bookTranslationMap = {
  "Mecánico": "Mecánicos",
  "Legiones Malignas": "Legiones Del Mal",
  "Dragon": "Dragones",
  "Legiones Benévolas": "Legiones Del Bien",
  "Espíritus": "Espíritus",
  "Invierno": "Invierno",
  "Alado": "Alados",
  "Mujer": "Monstruas",
  "No Muerto": "No Muertos",
  "Villanos": "Villanos",
  "Aventureros": "Aventureros",
  "Exclusivo": "Exclusivo",
  "Familias": "Familias",
  "Mar": "Marinos",
  "Superhéroes": "Superhéroes",
  "Inframundo": "Inframundo",
  "Elementales": "Elementales",
  "Zoomorfos": "Zoomorfos",
  "Portadores": "Portadores",
  "Guerras De Equipo": "Guerras De Equipo",
  "Elite": "Elite",
  "Carrera": "Carrera",
  "Misión": "Misión",
  "Nórdicos": "Moradores De Las Cimas",
  "Reinos Libres": "Reinos Libres",
  "Festividades": "Festividades",
  "Nueva Onda": "Nueva Oleada",
  "Antiguos Guardias Marinos": "Vieja Guardia Marina",
  "Monstelvania": "Monstelvania",
  "Abominaciones": "Abominaciones",
  "Civilizaciones Cósmicas": "Civilizaciones Del Cosmos",
  "Defensores Espaciales": "Defensores Del Espacio",
  "Viajeros De Las Estrellas": "Navegantes Estelares",
  "Gaia Pura": "Gaia Pura",
  "Corte Honesta": "Corte Justa",
  "Gremio De Aventureros": "Gremio De Los Aventureros",
  "Guarida De Almas": "Guardia De Almas",
  "Dojo De Furia": "Dojo De Furia",
  "Gaia Malvada": "Gaia Malvada",
  "Dojo De Honor": "Dojo De Honor",
  "Páramos": "El Paramo",
  "Patrulla De Elektra": "Patrulla Elektra",
  "El Sindicato": "El Sindicato",
  "Escuadrón De Venganza": "Escuadrón Vengativo",
  "Moradores Del Inframundo": "Moradores Del Inframundo",
  "Barbaros": "Barbaros",
  "Consejo De Magia": "Consejo Mágico",
  "Paraíso Celestial": "Paraíso Celestial",
  "Ciudadanos": "Ciudadanos",
  "Saurianos": "Saurios",
  "Liga De Cazadores": "Liga De Cazadores",
  "Piratas De Petra": "Piratas De Petra",
  "Cuchillas Oscuras": "Cuchillas Tenebrosas",
  "Fuerzas Ardientes": "Fuerzas Ardientes",
  "Cimas Rocosas": "Picos Montañosos",
  "Era Mítica Original": "Era Mítica Original",
  "Era Cósmica": "Era Cósmica",
  "Era Corrupta": "Era Corrupta",
  "Era Metropolitana": "Era Metropolitana",
  "Era Del Juicio Final": "Era Apocalíptica",
  "Era Silvestre": "Era Silvestre",
  "Era Galáctica": "Era Galáctica",
  "Era Abisal": "Era Abisal",
  "Era Multiverso": "Era Multiverso",
  "Era Alpina": "Era Alpina",
  "Era Histórica": "Era Histórica",
  "Era Feral": "Era Primitiva",
  "Era Conspirativa": "Era Conspiradora",
};

let assignedOptions = [];
let currentTooltip = null; // Variable para almacenar el tooltip actual

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
            .map((item) => {
              const iconPath = getIcon(item); // Obtiene la ruta del ícono
              console.log(`Resultado: ${item}, Imagen: ${iconPath}`); // Imprime el resultado y la ruta de la imagen
              return `<td>
                <img src="${iconPath}" alt="${item}" data-tooltip="${item}"/>
              </td>`;
            })
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

// Función para normalizar nombres
function normalizeName(name) {
  return name
    .toLowerCase() // Convierte a minúsculas
}

// Función para obtener la ruta del ícono correspondiente
function getIcon(name) {
  const translatedName = bookTranslationMap[name] || name; // Traduce el nombre si está en el mapa
  const normalizedName = normalizeName(translatedName); // Normaliza el nombre traducido
  return `/pvpamistosoml/img/${normalizedName}.png`; // Ruta del ícono
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
    currentBooks = Object.keys(bookTranslationMap); // Usa las claves del mapa como lista de libros
    localStorage.setItem("pvpml_language", selectedLang);
    languageMenu.style.display = "none"; // Ocultar el menú después de seleccionar
  });
});

// Cargar preferencia guardada
const savedLanguage = localStorage.getItem("pvpml_language");
if (savedLanguage) {
  currentBooks = Object.keys(bookTranslationMap); // Usa las claves del mapa como lista de libros
}

document.addEventListener("click", (e) => {
  const target = e.target;

  // Verifica si el clic es sobre un ícono con tooltip
  if (target.tagName === "IMG" && target.hasAttribute("data-tooltip")) {
    const originalName = target.getAttribute("data-tooltip");
    const tooltipText =
      localStorage.getItem("pvpml_language") === "lat"
        ? originalName // Muestra el nombre en Latino
        : bookTranslationMap[originalName] || originalName; // Traduce al Español si es necesario

    // Eliminar el tooltip actual si existe
    if (currentTooltip) {
      currentTooltip.remove();
      currentTooltip = null;
    }

    // Crear el nuevo tooltip
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

    // Guardar la referencia al tooltip actual
    currentTooltip = tooltip;

    // Desvanecer y eliminar el tooltip después de unos segundos
    setTimeout(() => {
      if (currentTooltip === tooltip) { // Verifica que el tooltip actual sea el mismo
        tooltip.style.opacity = "0";
        setTimeout(() => {
          tooltip.remove();
          currentTooltip = null; // Limpiar la referencia al tooltip
        }, 300); // Tiempo para que desaparezca completamente
      }
    }, 2000); // Tiempo que el tooltip permanece visible
  }
});