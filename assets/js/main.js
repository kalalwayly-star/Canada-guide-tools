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

        const container = document.getElementById("categories-container");

       categories.forEach(cat => {

    const card = document.createElement("div");
    card.classList.add("category-card");

    card.innerHTML = `
        <div style="font-size:30px;">${cat.icon}</div>
        <h3>${cat.title}</h3>
        <p>${cat.description}</p>
    `;

    // 👉 ADD CLICK
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
        window.location.href = `pages/category.html?name=${cat.title}`;
    });

    container.appendChild(card);
});
    })
    .catch(err => console.error("Error loading categories:", err));
