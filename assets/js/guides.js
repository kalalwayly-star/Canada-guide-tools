fetch("../assets/data/categories.json")
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(categories => {
        const container = document.getElementById("categories-container");
        
        // CRITICAL FIX: Prevent script crash if container is missing on this specific page
        if (!container) return;

        categories.forEach(cat => {
            const card = document.createElement("div");
            card.classList.add("category-card");
            card.style.cursor = "pointer";

            // SECURE FIX: Create explicit safely-isolated text nodes to block XSS injection attacks
            const iconDiv = document.createElement("div");
            iconDiv.style.fontSize = "30px";
            iconDiv.textContent = cat.icon;

            const title = document.createElement("h3");
            title.textContent = cat.title;

            const desc = document.createElement("p");
            desc.textContent = cat.description;

            // Assemble the elements cleanly
            card.appendChild(iconDiv);
            card.appendChild(title);
            card.appendChild(desc);

            // Handle the navigation event tree routing path securely
            card.addEventListener("click", () => {
                window.location.href = `category.html?id=${encodeURIComponent(cat.id)}`;
            });

            container.appendChild(card);
        });
    })
    .catch(err => console.error("Error loading categories data routing tree:", err));
