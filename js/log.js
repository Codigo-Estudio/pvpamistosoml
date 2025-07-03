// Guardar logs
function saveLogs() {
  localStorage.setItem("pvpml_logs", JSON.stringify(logEntries));
}

const logList = document.getElementById("log-list");
const logEntries = JSON.parse(localStorage.getItem("pvpml_logs")) || [];
if (logList) {
  logList.innerHTML = "";
  logEntries.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    logList.appendChild(li);
  });
}
const clearLogsBtn = document.getElementById("clear-logs");
if (clearLogsBtn && logList) {
  clearLogsBtn.addEventListener("click", () => {
    localStorage.removeItem("pvpml_logs");
    logList.innerHTML = "";
    if (Array.isArray(logEntries)) logEntries.length = 0;
  });
}
