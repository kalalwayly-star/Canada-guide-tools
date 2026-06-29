fetch("data/site.json")
    .then(res => res.json())
    .then(site => {
        document.getElementById("site-name").textContent = site.siteName;
        document.getElementById("site-tagline").textContent = site.tagline;
    });
