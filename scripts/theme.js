const savedTheme = localStorage.getItem("theme");
const icon = document.getElementById("theme-switch").querySelector("i");

function switchTheme() {
    const isLightMode = document.body.classList.toggle("light");
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
    if (icon) {
        icon.classList.toggle("fa-moon", !isLightMode);
        icon.classList.toggle("fa-sun", isLightMode);
    }
}

function applyTheme() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.toggle("light", savedTheme === "light");
    if (icon) {
        icon.classList.toggle("fa-moon", savedTheme !== "light");
        icon.classList.toggle("fa-sun", savedTheme === "light");
    }
}

applyTheme();
document.getElementById("theme-switch")?.addEventListener("click", switchTheme);
