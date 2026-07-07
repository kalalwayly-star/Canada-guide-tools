/* ===========================================================
   Newcomers Guides & Tools
   Checklist JavaScript
=========================================================== */

const STORAGE_KEY = "newcomerChecklist";
const LANGUAGE_KEY = "newcomerLanguage";

/* ===========================================================
   Translation Dictionary
=========================================================== */

const translations = {

    en: {

        back_btn: "← Back to Tools",

        heading: "📋 Newcomer Essential Checklist",

        intro: "Complete these important settlement tasks as you begin your new life in Canada. Your progress is automatically saved in your browser.",

        progress: "Progress",

        cat1: "First 48 Hours",

        cat2: "First 2 Weeks",

        cat3: "First Month",

        cat4: "First 3 Months",

        item1: "Apply for a Social Insurance Number (SIN)",

        item2: "Get a Canadian phone number",

        item3: "Secure temporary accommodation",

        item4: "Keep important documents organized",

        item5: "Open a Canadian bank account",

        item6: "Apply for provincial health coverage",

        item7: "Register for newcomer settlement services",

        item8: "Get a transit card",

        item9: "Create a CRA account",

        item10: "Find permanent housing",

        item11: "Register children for school",

        item12: "Prepare a Canadian-style resume",

        item13: "Start applying for jobs",

        item14: "Find a family doctor",

        item15: "Exchange your driver's licence if eligible",

        item16: "Build your Canadian credit history",

        item17: "Apply for government benefits if eligible",

        item18: "Improve your English or French skills",

        item19: "Join local community groups"

    },

    ar: {

        back_btn: "← العودة إلى الأدوات",

        heading: "📋 قائمة المهام الأساسية للقادمين الجدد",

        intro: "أكمل هذه المهام المهمة عند بدء حياتك الجديدة في كندا. يتم حفظ تقدمك تلقائياً في متصفحك.",

        progress: "نسبة الإنجاز",

        cat1: "أول 48 ساعة",

        cat2: "أول أسبوعين",

        cat3: "الشهر الأول",

        cat4: "أول ثلاثة أشهر",

        item1: "التقديم للحصول على رقم التأمين الاجتماعي (SIN)",

        item2: "الحصول على رقم هاتف كندي",

        item3: "تأمين سكن مؤقت",

        item4: "تنظيم وحفظ الوثائق المهمة",

        item5: "فتح حساب بنكي كندي",

        item6: "التسجيل في التأمين الصحي بالمقاطعة",

        item7: "التسجيل في خدمات دعم القادمين الجدد",

        item8: "الحصول على بطاقة المواصلات",

        item9: "إنشاء حساب لدى وكالة الضرائب الكندية (CRA)",

        item10: "البحث عن سكن دائم",

        item11: "تسجيل الأطفال في المدرسة",

        item12: "إعداد سيرة ذاتية بالطريقة الكندية",

        item13: "البدء بالتقديم على الوظائف",

        item14: "العثور على طبيب أسرة",

        item15: "استبدال رخصة القيادة إذا كنت مؤهلاً",

        item16: "بناء سجل ائتماني كندي",

        item17: "التقديم على المساعدات الحكومية إذا كنت مؤهلاً",

        item18: "تحسين اللغة الإنجليزية أو الفرنسية",

        item19: "الانضمام إلى مجموعات المجتمع المحلي"

    }

};

/* ===========================================================
   Save Checklist
=========================================================== */

function saveChecklist() {

    const data = {};

    document.querySelectorAll('input[type="checkbox"]').forEach(box => {

        data[box.id] = box.checked;

    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

}

/* ===========================================================
   Load Checklist
=========================================================== */

function loadChecklist() {

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    document.querySelectorAll('input[type="checkbox"]').forEach(box => {

        box.checked = saved[box.id] || false;

        updateCompletedStyle(box);

    });

}

/* ===========================================================
   Update Progress
=========================================================== */

function updateProgress() {

    const boxes = document.querySelectorAll('input[type="checkbox"]');

    const checked = document.querySelectorAll('input[type="checkbox"]:checked');

    const percent = Math.round((checked.length / boxes.length) * 100);

    document.getElementById("progressBar").style.width = percent + "%";

    document.getElementById("progressText").textContent = percent + "%";

    boxes.forEach(updateCompletedStyle);

    saveChecklist();

}

/* ===========================================================
   Completed Style
=========================================================== */

function updateCompletedStyle(box) {

    const label = box.closest(".task");

    if (!label) return;

    label.classList.toggle("completed", box.checked);

}

/* ===========================================================
   Reset
=========================================================== */

document.getElementById("resetBtn").addEventListener("click", () => {

    if (!confirm("Reset your checklist?")) return;

    document.querySelectorAll("input[type='checkbox']").forEach(box => {

        box.checked = false;

    });

    localStorage.removeItem(STORAGE_KEY);

    updateProgress();

});

/* ===========================================================
   Print
=========================================================== */

document.getElementById("printBtn").addEventListener("click", () => {

    window.print();

});

/* ===========================================================
   Language
=========================================================== */

function setLanguage(lang){

    localStorage.setItem(LANGUAGE_KEY, lang);

    document.documentElement.lang = lang;

    document.body.classList.toggle("rtl", lang === "ar");

    document.querySelectorAll("[data-i18n]").forEach(el=>{

        const key = el.dataset.i18n;

        if(translations[lang][key]){

            el.textContent = translations[lang][key];

        }

    });

    document.getElementById("lang-toggle").textContent =
        lang === "en" ? "العربية" : "English";

}

/* ===========================================================
   Language Button
=========================================================== */

document.getElementById("lang-toggle").addEventListener("click",()=>{

    const current = localStorage.getItem(LANGUAGE_KEY) || "en";

    const next = current === "en" ? "ar" : "en";

    setLanguage(next);

});

/* ===========================================================
   Events
=========================================================== */

document.querySelectorAll("input[type='checkbox']").forEach(box=>{

    box.addEventListener("change",updateProgress);

});

/* ===========================================================
   Startup
=========================================================== */

loadChecklist();

updateProgress();

setLanguage(localStorage.getItem(LANGUAGE_KEY) || "en");
