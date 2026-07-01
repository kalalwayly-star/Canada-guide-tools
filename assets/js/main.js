let allArticles = [];
// Load site info
fetch("data/site.json")
    .then(res => res.json())
    .then(site => {
        document.getElementById("site-name").textContent = site.siteName;
        document.getElementById("site-tagline").textContent = site.tagline;
    });

// Load categories
fetch("data/categories.json")
    .then(res => res.json())
    .then(categories => {
// Load all articles for search
fetch("data/articles.json")
    .then(res => res.json())
    .then(articles => {
        allArticles = articles;
.then(articles => {
    allArticles = articles;
    console.log("ARTICLES LOADED:", allArticles);
});
    })
    .catch(err => console.error("Error loading articles:", err));
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

const searchInput = document.getElementById("search-input");

if (searchInput) {

    searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase().trim();
     const matches = allArticles.filter(article => {
        return article.title.toLowerCase().includes(searchText);
    });    

    console.log(searchText);

});
}


