/* =====================================================
   UNIVERSAL CALCULATOR ENGINE
   Works for: rent, budget, savings, tax, etc.
===================================================== */

let TEXT = {};
let LANG = "en";

/* -------------------------------
   LOAD TRANSLATIONS
--------------------------------*/
async function loadTranslations() {
    const res = await fetch("../assets/data/calculators_text.json");
    TEXT = await res.json();

    const urlLang = new URLSearchParams(window.location.search).get("lang");
    LANG = urlLang === "ar" ? "ar" : "en";

    applyLanguage();
}

/* -------------------------------
   APPLY TRANSLATION
--------------------------------*/
function applyLanguage() {
    document.documentElement.lang = LANG;
    document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const value = getText(key);
        if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-placeholder]").forEach(el => {
        const key = el.getAttribute("data-placeholder");
        const value = getText(key);
        if (value) el.placeholder = value;
    });
}

/* -------------------------------
   GET TEXT FROM JSON
--------------------------------*/
function getText(key) {
    const parts = key.split(".");
    let value = TEXT?.[LANG];

    for (let part of parts) {
        value = value?.[part];
    }

    return value;
}

/* -------------------------------
   FORMAT CURRENCY (CAD)
--------------------------------*/
function formatMoney(amount) {
    return new Intl.NumberFormat(
        LANG === "ar" ? "ar-CA" : "en-CA",
        {
            style: "currency",
            currency: "CAD"
        }
    ).format(amount);
}

/* =====================================================
   RENT CALCULATOR
===================================================== */
function runRentCalculator() {

    const income = parseFloat(getVal("income")) || 0;

    const rent = parseFloat(getVal("rent")) || 0;
    const utilities = parseFloat(getVal("utilities")) || 0;
    const internet = parseFloat(getVal("internet")) || 0;
    const insurance = parseFloat(getVal("insurance")) || 0;
    const parking = parseFloat(getVal("parking")) || 0;

    const transport = parseFloat(getVal("transport")) || 0;
    const groceries = parseFloat(getVal("groceries")) || 0;

    const housing = rent + utilities + internet + insurance + parking;
    const total = housing + transport + groceries;

    const recommendedRent = (income * 0.30) / 12;
    const remaining = income - total;

    show("results");

    set("recommendedRent", formatMoney(recommendedRent));
    set("housingCost", formatMoney(housing));
    set("remainingIncome", formatMoney(remaining));

    updateMeter(housing, income);
}

/* -------------------------------
   METER LOGIC
--------------------------------*/
function updateMeter(housing, income) {

    if (!income) return;

    const percent = (housing / income) * 100;
    const meter = document.getElementById("meterFill");

    document.getElementById("meterPercent").textContent =
        percent.toFixed(0) + "%";

    let status = "";

    if (percent <= 30) {
        meter.style.width = "30%";
        meter.style.background = "green";
        status = "excellent";
    } else if (percent <= 40) {
        meter.style.width = percent + "%";
        meter.style.background = "orange";
        status = "warning";
    } else {
        meter.style.width = percent + "%";
        meter.style.background = "red";
        status = "danger";
    }

    document.getElementById("meterStatus").textContent = status;
}

/* -------------------------------
   HELPERS
--------------------------------*/
function getVal(id) {
    return document.getElementById(id)?.value;
}

function set(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function show(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
}

/* -------------------------------
   INIT
--------------------------------*/
document.addEventListener("DOMContentLoaded", () => {

    loadTranslations().then(() => {

        const page = document.body.dataset.calculator;

        if (page === "rent") {
            document.getElementById("calculateBtn")
                .addEventListener("click", runRentCalculator);
        }

        if (page === "budget") {
            // later we add budget engine here
        }

    });

});
