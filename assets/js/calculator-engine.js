/* =========================================================
   UNIVERSAL CALCULATOR ENGINE (PRODUCTION READY)
   Supports: EN / AR + multiple calculators + JSON texts
========================================================= */

const CalculatorEngine = (() => {

    let LANG = "en";
    let TEXT = {};
    let CURRENT_CALCULATOR = null;

    /* =========================
       INIT
    ========================= */
    async function init(options = {}) {

        // detect calculator type from HTML
        CURRENT_CALCULATOR = document.body.dataset.calculator || "default";

        // detect language from URL
        const urlLang = new URLSearchParams(window.location.search).get("lang");
        LANG = urlLang === "ar" ? "ar" : "en";

        // load translations
        await loadText();

        // apply UI
        applyLanguage();

        // bind language toggle if exists
        bindLanguageButton();

        return true;
    }

    /* =========================
       LOAD JSON TEXTS
    ========================= */
    async function loadText() {
        try {
            const res = await fetch("../assets/data/calculators_text.json");
            TEXT = await res.json();
        } catch (err) {
            console.error("Translation file not found", err);
        }
    }

    /* =========================
       APPLY LANGUAGE
    ========================= */
    function applyLanguage() {

        document.documentElement.lang = LANG;
        document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";

        const dict = TEXT?.[LANG] || {};

        // TEXT nodes
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            const value = get(dict, key);
            if (value) el.innerText = value;
        });

        // PLACEHOLDERS
        document.querySelectorAll("[data-placeholder]").forEach(el => {
            const key = el.getAttribute("data-placeholder");
            const value = get(dict, key);
            if (value) el.placeholder = value;
        });
    }

    /* =========================
       GET NESTED VALUE
    ========================= */
    function get(obj, path) {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    }

    /* =========================
       LANGUAGE TOGGLE
    ========================= */
    function bindLanguageButton() {

        const btn = document.getElementById("languageBtn");
        if (!btn) return;

        btn.addEventListener("click", () => {

            LANG = (LANG === "en") ? "ar" : "en";

            // update URL (no reload)
            const newUrl = `${window.location.pathname}?lang=${LANG}`;
            window.history.replaceState({}, "", newUrl);

            applyLanguage();
        });
    }

    /* =========================
       FORMAT MONEY (CAD)
    ========================= */
    function formatMoney(value) {

        return new Intl.NumberFormat(
            LANG === "ar" ? "ar-CA" : "en-CA",
            {
                style: "currency",
                currency: "CAD"
            }
        ).format(value);
    }

    /* =========================
       GET INPUT VALUE
    ========================= */
    function getValue(id) {
        const el = document.getElementById(id);
        return el ? parseFloat(el.value) || 0 : 0;
    }

    /* =========================
       SET TEXT
    ========================= */
    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    }

    /* =========================
       SHOW ELEMENT
    ========================= */
    function show(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove("hidden");
    }

    /* =========================
       HIDE ELEMENT
    ========================= */
    function hide(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
    }

    /* =========================
       SIMPLE ALERT SYSTEM
    ========================= */
    function setResult(type, titleId, textId, title, text) {

        const box = document.getElementById("result");

        if (!box) return;

        box.className = `result-box ${type}`;
        box.style.display = "block";

        setText(titleId, title);
        setText(textId, text);
    }

    /* =========================
       EXPORT API
    ========================= */
    return {
        init,
        getValue,
        setText,
        show,
        hide,
        formatMoney,
        setResult,
        get lang() { return LANG; },
        get calculator() { return CURRENT_CALCULATOR; }
    };

})();
