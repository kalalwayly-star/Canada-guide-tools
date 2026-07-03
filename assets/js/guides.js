fetch("../assets/data/categories.json")
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

                window.location.href = `category.html?id=${cat.id}`;

            });

            container.appendChild(card);

        });

    })
    .catch(err => console.error(err));
