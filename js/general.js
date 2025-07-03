// Menú lateral
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
if (menuToggle && menu) {
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });
}
document.addEventListener("click", (e) => {
  if (
    menu &&
    menuToggle &&
    !menu.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    menu.style.display = "none";
  }
});

// Footer motivacional
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
const footerElement = document.getElementById("motivational-footer");
if (footerElement) {
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
}

// Modo oscuro
const darkToggle = document.getElementById("dark-mode-toggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    darkToggle.textContent = isDark ? "☀️" : "🌙";
    darkToggle.title = isDark ? "Modo claro" : "Modo oscuro";
    if (menu) menu.classList.remove("open");
  });
}