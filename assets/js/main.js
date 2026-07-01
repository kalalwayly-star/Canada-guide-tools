let allArticles = [];

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
const searchInput = document.getElementById("search-input");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const searchText = searchInput.value.toLowerCase().trim();
       const resultsContainer = document.getElementById("search-results");
       resultsContainer.innerHTML = "";
       
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

        if (title.includes(searchText)) {
            score += 10;
        }

        if (summary.includes(searchText)) {
            score += 5;
        }

        if (content.includes(searchText)) {
            score += 2;
        }

        return { ...article, score };

    })
    .filter(article => article.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

       matches.forEach(article => {

    const item = document.createElement("div");

item.innerHTML = `
    <h4>${article.title}</h4>
    <p>${article.summary}</p>

    <small>
        ${article.category} • ${article.readTime}
    </small>
`;
    item.classList.add("search-result-item");
          item.addEventListener("click", () => {
    window.location.href = `pages/article.html?id=${article.id}`;
});

    resultsContainer.appendChild(item);

});

resultsContainer.style.display = matches.length > 0 ? "block" : "none";
    });

}
