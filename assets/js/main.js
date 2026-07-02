let allArticles = [];
let selectedIndex = -1;
/* =========================
   Load site info
========================= */
fetch("data/site.json")
    .then(res => res.json())
    .then(site => {
        document.getElementById("site-name").textContent = site.siteName;
        document.getElementById("site-tagline").textContent = site.tagline;
    });


/* =========================
   Load categories
========================= */
fetch("data/categories.json")
    .then(res => res.json())
    .then(categories => {

        const container = document.getElementById("categories-container");

        categories.forEach(cat => {

            const card = document.createElement("div");
            card.classList.add("category-card");

            card.innerHTML = `
                <div style="font-size:30px;">${cat.icon}</div>
                <h3>${cat.title}</h3>
                <p>${cat.description}</p>
            `;

            card.style.cursor = "pointer";

            card.addEventListener("click", () => {
                window.location.href = `pages/category.html?id=${cat.id}`;
            });

            container.appendChild(card);

        });

    })
    .catch(err => console.error("Error loading categories:", err));


/* =========================
   Load articles (FOR SEARCH)
========================= */
fetch("data/articles.json")
    .then(res => res.json())
    .then(articles => {
        allArticles = articles;
        console.log("ARTICLES LOADED:", allArticles);
    })
    .catch(err => console.error("Error loading articles:", err));


/* =========================
   SEARCH
========================= */
function highlightText(text, searchText) {
    if (!searchText) return text;

    const regex = new RegExp(`(${searchText})`, "gi");

    return text.replace(regex, "<mark>$1</mark>");
}

function debounce(func, delay) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const searchInput = document.getElementById("search-input");

if (searchInput) {

    searchInput.addEventListener(
        "input",
        debounce(() => {

            const searchText = searchInput.value.toLowerCase().trim();
            const resultsContainer = document.getElementById("search-results");

            resultsContainer.innerHTML = "";
           selectedIndex = -1;

            if (searchText === "") {
                resultsContainer.style.display = "none";
                return;
            }

            const matches = allArticles
                .map(article => {

                    let score = 0;

                    const title = article.title.toLowerCase();
                    const summary = article.summary.toLowerCase();
                    const content = article.content.join(" ").toLowerCase();

                    if (title.includes(searchText)) score += 10;
                    if (summary.includes(searchText)) score += 5;
                    if (content.includes(searchText)) score += 2;

                    return { ...article, score };

                })
                .filter(article => article.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 5);

            matches.forEach(article => {

                const item = document.createElement("div");

                item.innerHTML = `
                    <h4>${highlightText(article.title, searchText)}</h4>
                    <p>${highlightText(article.summary, searchText)}</p>
                    <small>${article.category} • ${article.readTime}</small>
                `;
               item.dataset.id = article.id;

                item.addEventListener("click", () => {
                    window.location.href = `pages/article.html?id=${article.id}`;
                });

                resultsContainer.appendChild(item);

            });

            resultsContainer.style.display = matches.length > 0 ? "block" : "none";

        }, 200)
    );

}

document.addEventListener("click", (event) => {

    const resultsContainer = document.getElementById("search-results");

    if (
        !searchInput.contains(event.target) &&
        !resultsContainer.contains(event.target)
    ) {
        resultsContainer.style.display = "none";
    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        const resultsContainer = document.getElementById("search-results");

        resultsContainer.style.display = "none";

        searchInput.blur();

    }
 if (event.key === "ArrowDown") {

    const results = document.querySelectorAll(".search-result-item");

    if (results.length === 0) return;

    if (selectedIndex < results.length - 1) {
        selectedIndex++;
    }

    results.forEach(item => item.classList.remove("active"));

    if (results[selectedIndex]) {
        results[selectedIndex].classList.add("active");
    }

    console.log("Selected:", selectedIndex);
}
if (event.key === "Enter") {

    const results = document.querySelectorAll(".search-result-item");

    if (results.length === 0) return;

    if (selectedIndex === -1) {
        selectedIndex = 0;
    }

    const selectedItem = results[selectedIndex];

    const articleId = selectedItem.dataset.id;

    if (articleId) {
        window.location.href = `pages/article.html?id=${articleId}`;
    }
}
});
