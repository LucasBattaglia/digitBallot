/** Script.js
 * Ce script gère l'affichage d'une navigation dynamique basée sur les éléments de la page,
 * ainsi que la gestion de l'affichage/masquage de certaines sections en fonction de la taille de l'écran ou de l'impression.
 *
 * @author Lucas BATTAGLIA
 * @contact Lucas.battaglia@etu.uca.fr
 * @date 24/03/2024
 */

// Vérifie la largeur de l'écran et masque la section "more" si elle est affichée
if (!window.matchMedia("(max-width: 640px)").matches) {
    document.querySelector(".more").style.display = "none"; // Masque la section "more"
    document.querySelector("#toggleButton").textContent = "+"; // Change le texte du bouton
}

// Ajoute un écouteur d'événement au bouton de basculement pour afficher ou masquer la section "more"
document.getElementById("toggleButton").addEventListener("click", function () {
    var moreElement = document.querySelector(".more");
    var boutonElement = document.querySelector("#toggleButton");

    if (moreElement.style.display === "none") {
        moreElement.style.display = "flex"; // Affiche la section "more"
        boutonElement.textContent = "-"; // Change le texte du bouton
    } else {
        moreElement.style.display = "none"; // Masque la section "more"
        boutonElement.textContent = "+"; // Change le texte du bouton
    }

    // Réappel de la fonction pour mettre à jour la navigation
    updateNavigation();
});

/**
 * Met à jour la navigation en fonction des éléments de la page et de l'affichage de la section "more".
 */
function updateNavigation() {
    var sectionJeux = document.getElementById("jeux");
    var sommaireNav = document.getElementById("sommaire");

    // Fonction pour vérifier si la section "more" ou ses parents sont cachés
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

// Ajoute un écouteur d'événement au bouton d'impression pour charger une feuille de style dédiée à l'impression
document.getElementById('impr').addEventListener("click", function () {
    var pathToCreate = '../css/impression.css';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', pathToCreate, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {

                // Supprime la feuille de style en cours
                const StyleActuel = document.getElementById("mainStylesheet");
                try {
                    StyleActuel.disabled = true;
                }
                catch (e) {
                    console.error(e);
                }

                // Crée un élément <style> et ajoute le contenu de la feuille de style
                const styleElement = document.createElement('style');
                styleElement.textContent = xhr.responseText;
                document.head.appendChild(styleElement);

                window.print(); // Lance l'impression
                styleElement.remove(); // Supprime la feuille de style après l'impression
                try {
                    StyleActuel.disabled = false;
                }
                catch (e) {
                    console.error(e);
                }

            } else {
                console.error('Erreur lors du chargement de la feuille de style :', xhr.status);
            }
        }
    };
    xhr.send();
});
