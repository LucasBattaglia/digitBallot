if (!window.matchMedia("(max-width: 640px)").matches) {
    document.querySelector(".more").style.display = "none";
    document.querySelector("#toggleButton").textContent = "+";
}

document.getElementById("toggleButton").addEventListener("click", function () {
    var moreElement = document.querySelector(".more");
    var boutonElement = document.querySelector("#toggleButton");

    if (moreElement.style.display === "none") {
        moreElement.style.display = "flex";
        boutonElement.textContent = "-";
    } else {
        moreElement.style.display = "none";
        boutonElement.textContent = "+";
    }

    // Réappel de la fonction pour mettre à jour la navigation
    updateNavigation();
});

function updateNavigation() {
    var sectionJeux = document.getElementById("jeux");
    var sommaireNav = document.getElementById("sommaire");

    // Fonction pour vérifier si la section .more ou ses parents sont cachés
    function isMoreSectionOrParentsHidden(element) {
        while (element && element !== document.body) {
            if (element.classList.contains("more") && window.getComputedStyle(element).display === "none") {
                return true;
            }
            element = element.parentElement;
        }
        return false;
    }

    // Supprime les anciens liens de navigation
    sommaireNav.innerHTML = "";

    // Sélectionne tous les éléments <h3> dans la section
    var h3Elements = sectionJeux.querySelectorAll("h3");

    // Parcourt chaque élément <h3> et les ajoute à l'élément <nav>
    h3Elements.forEach(function (h3) {
        var isHidden = isMoreSectionOrParentsHidden(h3);

        if (!isHidden) {
            var link = document.createElement("a");
            link.textContent = h3.textContent;
            link.setAttribute("href", "#" + h3.getAttribute("id"));

            var listItem = document.createElement("li");
            listItem.appendChild(link);

            sommaireNav.appendChild(listItem);
        }
    });
}

// Appel initial de la fonction pour créer la navigation au chargement de la page
updateNavigation();

document.getElementById('impr').addEventListener("click", function () {
    var pathToCreate = '../css/impression.css';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', pathToCreate, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const styleElement = document.createElement('style');
                styleElement.textContent = xhr.responseText;
                document.head.appendChild(styleElement);

                window.print();
                styleElement.remove();

            } else {
                console.error('Erreur lors du chargement de la feuille de style :', xhr.status);
            }
        }
    };
    xhr.send();
});
