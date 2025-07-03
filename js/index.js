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
const logEntries = JSON.parse(localStorage.getItem("pvpml_logs")) || [];

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
if (document.querySelector("#result-table tbody")) {
  loadResults();
}

// Guardar resultados
function saveResults() {
  const rows = Array.from(document.querySelectorAll("#result-table tbody tr"));
  const results = rows.map((row) =>
    Array.from(row.children).map((cell) => cell.textContent)
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
      logEntries.push(entry);
      saveLogs();
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
      const resultText = items.join(", ");
      const entry = `${now} - ${username} - Buscar Suerte - ${resultText}`;
      logEntries.push(entry);
      saveLogs();
      const resultTable = document.querySelector("#result-table tbody");
      if (resultTable) {
        const row = document.createElement("tr");
        const rowCount =
          document.querySelectorAll("#result-table tbody tr").length + 1;
        row.innerHTML = `
          <td>${rowCount}</td>
          <td>${username}</td>
          <td>${selectedOption}</td>
          <td>${items[0] || ""}</td>
          <td>${items[1] || ""}</td>
          <td>${items[2] || ""}</td>
        `;
        resultTable.appendChild(row);
        saveResults();
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
    localStorage.removeItem("pvpml_results");
    hideMessages();
    assignedOptions = [];
  });
}

// Utilidad para obtener elementos aleatorios
function getRandom(arr, n) {
  return arr.sort(() => 0.5 - Math.random()).slice(0, n);
}
