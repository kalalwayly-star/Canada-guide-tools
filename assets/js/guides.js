// Wrap code to ensure webpage elements are ready first
document.addEventListener("DOMContentLoaded", () => {
    
    // Auto-detect root path structures based on where guides.html is located
    const potentialPaths = [
        "./data/categories.json",   // If guides.html is in your main root folder
        "../data/categories.json"  // If guides.html is inside a subfolder (like pages/)
    ];

    function fetchCategories(pathIndex) {
        if (pathIndex >= potentialPaths.length) {
            console.error("Critical: Could not locate your root data/categories.json file at any expected path.");
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
                
                // Block script execution if container element is missing
                if (!container) {
                    console.warn("Target element #categories-container was not found on this page.");
                    return;
                }

                // Clear layout placeholders
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

                console.log("Success! Loaded categories cleanly from path layout: " + currentPath);
            })
            .catch(() => {
                // If path fails, automatically test the next option in the array
                fetchCategories(pathIndex + 1);
            });
    }

    // Initialize data mapping fetch loop
    fetchCategories(0);
});
