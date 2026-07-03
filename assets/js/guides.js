// Wrap code in an event listener to guarantee the HTML elements exist first
document.addEventListener("DOMContentLoaded", () => {

    // Fetch categories database file entries dynamically from server paths
    fetch("./assets/data/categories.json")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status code profile verified: ${res.status}`);
            }
            return res.json();
        })
        .then(categories => {
            // Targets your exact HTML <div id="categories-container"> element block
            const container = document.getElementById("categories-container");
            
            // Safety check to completely block script crashes if element is missing
            if (!container) {
                console.warn("Target element #categories-container was not found on this document page layout template.");
                return;
            }

            // Empty out any pre-existing text or template placeholders safely
            container.textContent = "";

            categories.forEach(cat => {
                // Create the main card wrapping grid layout container box
                const card = document.createElement("div");
                card.classList.add("category-card");
                card.style.cursor = "pointer";

                // Create and populate the visual category icon element block securely
                const iconDiv = document.createElement("div");
                iconDiv.classList.add("category-icon");
                iconDiv.style.fontSize = "36px";
                iconDiv.style.marginBottom = "10px";
                iconDiv.textContent = cat.icon;

                // Create and populate the structural header text element safely
                const title = document.createElement("h3");
                title.classList.add("category-title");
                title.textContent = cat.title;

                // Create and populate the informational snippet text block safely
                const desc = document.createElement("p");
                desc.classList.add("category-desc");
                desc.textContent = cat.description;

                // Assemble child node components structurally inside the card layout parent
                card.appendChild(iconDiv);
                card.appendChild(title);
                card.appendChild(desc);

                // Set up click monitoring to execute URL parameter routing safely
                card.addEventListener("click", () => {
                    window.location.href = `category.html?id=${encodeURIComponent(cat.id)}`;
                });

                // Append the fully constructed secure item block directly to the visible page container
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Critical execution breakdown mapping newcomer category grids layout:", err);
        });

}); // End of DOMContentLoaded wrapper
