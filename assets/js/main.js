// Load website information from site.json

fetch("data/site.json")
    .then(response => response.json())
    .then(site => {

        document.getElementById("site-name").textContent = site.siteName;

        document.getElementById("site-tagline").textContent = site.tagline;

    })
    .catch(error => {

        console.error("Error loading site information:", error);

    });
