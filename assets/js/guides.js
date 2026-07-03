document.addEventListener("DOMContentLoaded", () => {
    // Array of possible paths to find your categories file
    const potentialPaths = [
        "./assets/data/categories.json",   // If guides.html is in the main root folder
        "../assets/data/categories.json"  // If guides.html is inside a subfolder (like /pages)
    ];

    function fetchCategories(pathIndex) {
        if (pathIndex >= potentialPaths.length) {
            console.error("Critical: Could not find categories.json at any of the attempted file paths.");
            return;
        }

        const currentPath = potentialPaths[pathIndex];

        fetch(currentPath)
            .then(res => {
                if (!res.ok) throw new Error("Path not found");
                return res.json();
            })
            .then(categories => {
                const container = document.getElementById("categories-container");
                if (!container) {
                    console.warn("Target element #categories-container was not found on this document page layout template.");
                    return;
                }

                container.textContent = "";

                categories.forEach(cat => {
                    const card = document.createElement("div");
                    card.classList.add("category-card");
                    card.style.cursor = "pointer";

                    const iconDiv = document.createElement("div");
                    iconDiv.classList.add("category-icon");
                    iconDiv.style.fontSize = "36px";
                    iconDiv.style.marginBottom = "10px";
                    iconDiv.textContent = cat.icon;

                    const title = document.createElement("h3");
                    title.classList.add("category-title");
                    title.textContent = cat.title;

                    const desc = document.createElement("p");
                    desc.classList.add("category-desc");
                    desc.textContent = cat.description;

                    card.appendChild(iconDiv);
                    card.appendChild(title);
                    card.appendChild(desc);

                    card.addEventListener("click", () => {
                        window.location.href = `category.html?id=${encodeURIComponent(cat.id)}`;
                    });

                    container.appendChild(card);
                });

                console.log("Success! Categories successfully loaded from path: " + currentPath);
            })
            .catch(() => {
                // If this path failed with a 404, automatically try the next one in the array
                fetchCategories(pathIndex + 1);
            });
    }

    // Start trying to load the file
    fetchCategories(0);
});
