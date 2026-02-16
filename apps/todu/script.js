function setLang(lang) {
    document.querySelectorAll("[data-ja]").forEach(el => {
        el.textContent = el.getAttribute("data-" + lang);
    });
    localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", function () {
    const savedLang = localStorage.getItem("lang");
    const browserLang = navigator.language.startsWith("ja") ? "ja" : "en";
    setLang(savedLang || browserLang);
});
