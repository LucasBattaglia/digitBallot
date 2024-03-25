/**
 * Ce script gère les fonctionnalités de connexion et d'inscription ainsi que la validation des champs de formulaire,
 * la visibilité du mot de passe et le retour au formulaire de connexion.
 *
 * @author Lucas BATTAGLIA
 * @contact Lucas.battaglia@etu.uca.fr
 * @date 24/03/2023
 */

/*********************** Formulaire de connexion *******************************/

// Ajoute un écouteur d'événement au chargement du document
document.addEventListener("DOMContentLoaded", function () {
    // Récupère le formulaire de connexion par son identifiant
    const form = document.getElementById("connexion");

    // Vérifie si le formulaire existe
    if (form !== null) {
        // Récupère l'élément HTML pour afficher les messages de connexion
        const messageLog = document.getElementById("messageLog");

        // Écoute l'événement de soumission de formulaire
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Empêche l'envoi du formulaire par défaut

            // Récupère les valeurs des champs d'entrée pour le nom d'utilisateur et le mot de passe
            const username = document.getElementById("username").value;
            const password = document.getElementById("userpwd").value;

            // Crée un nouvel objet XMLHttpRequest pour effectuer une requête asynchrone
            const xhr = new XMLHttpRequest();

            // Définit une fonction de rappel qui sera appelée chaque fois que l'état de la requête change
            xhr.onreadystatechange = function () {
                // Vérifie si la requête est terminée
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    // Vérifie si la réponse du serveur est réussie (statut HTTP 200)
                    if (xhr.status === 200) {
                        // Récupère la réponse du serveur
                        const response = xhr.responseText;

                        // Vérifie le contenu de la réponse pour afficher un message approprié
                        if (response.includes("Le nom d'utilisateur et le mot de passe sont invalide")) {
                            // Affiche un message d'erreur si les informations d'identification sont invalides
                            messageLog.className = 'erreur';
                        } else {
                            // Affiche un message de connexion réussie si les informations d'identification sont valides
                            messageLog.className = 'connecter';

                            // Affiche le contenu associé à la connexion réussie, par exemple, un lien de déconnexion
                            var connect = document.getElementById("connect");
                            if (connect !== null) {
                                form.style.display = "none"; // Cache le formulaire de connexion
                                connect.style.display = "block"; // Affiche le contenu associé à la connexion
                            }
                        }
                        // Affiche la réponse du serveur dans l'élément prévu à cet effet
                        messageLog.textContent = response;
                    } else {
                        // Affiche une alerte en cas d'erreur de requête HTTP
                        alert("Une erreur s'est produite lors de la requête.");
                    }
                }
            };

            // Initialise la requête avec la méthode POST et l'URL de destination
            xhr.open("POST", "htbin/login.py", true);

            // Définit l'en-tête de la requête pour spécifier le type de contenu
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            // Envoie la requête avec les données d'identification encodées en URL
            xhr.send("username=" + encodeURIComponent(username) + "&userpwd=" + encodeURIComponent(password));
        });
    }
});

/**************** Formulaire d'inscription *********************/

// Sélection de tous les champs du formulaire d'inscription
var inputs = document.querySelectorAll('.card input');

/**
 * Fonction appelée lors de la saisie dans les champs du formulaire d'inscription.
 * Déclenche la validation du formulaire à chaque modification.
 */
inputs.forEach(function (input) {
    input.addEventListener('input', function () {
        validateForm(); // Appel de la fonction de validation du formulaire
    });
});

/**
 * Valide la date de naissance au format JJ/MM/AAAA.
 *
 * @param {string} dateString - La date à valider.
 * @returns {boolean} - true si la date est valide, sinon false.
 */
function isValidDate(dateString) {
    // Regex pour le format de la date
    var regEx = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateString.match(regEx)) return false;

    // Extraction du jour, du mois et de l'année
    var parts = dateString.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var year = parseInt(parts[2], 10);

    // Création d'un objet Date et vérification de sa validité
    var date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}
/**
 * Vérifie la validité du mot de passe en fonction des critères définis.
 *
 * @param {string} password - Le mot de passe à valider.
 * @returns {boolean} - true si le mot de passe est valide, sinon false.
 */
function isValidPassword(password) {
    // Regex pour le format du mot de passe
    var regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_;:!?./*&$]).{12,}$/;
    return regEx.test(password);
}

/**
 * Vérifie la validité de l'adresse e-mail.
 *
 * @param {string} email - L'adresse e-mail à valider.
 * @returns {boolean} - true si l'adresse e-mail est valide, sinon false.
 */
function isValidEmail(email) {
    // Regex pour le format de l'adresse e-mail
    var regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEx.test(email);
}

/**
 * Valide tous les champs du formulaire et affiche les messages d'erreur appropriés.
 *
 * @returns {boolean} - true si tous les champs du formulaire sont valides, sinon false.
 */
function validateForm() {
    // Récupération des valeurs des champs du formulaire
    var nom = document.getElementById('lastname').value;
    var prenom = document.getElementById('firstname').value;
    var dateNaissance = document.getElementById('birthdate').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('userpwd').value;
    var email = document.getElementById('useremail').value;

    // Booléen pour indiquer si le formulaire est valide
    var isValid = true;

    // Validation du nom
    var lastnameSpan = document.getElementById('lastnameSpan');
    if (nom.trim() === '') {
        isValid = false; // Le champ est vide, donc le formulaire n'est pas valide
        lastnameSpan.textContent = "Ce champ ne peut être vide"; // Affichage d'un message d'erreur
    } else {
        lastnameSpan.textContent = ""; // Effacement du message d'erreur
    }

    // Validation du prénom
    var firstnameSpan = document.getElementById('firstnameSpan');
    if (prenom.trim() === '') {
        isValid = false; // Le champ est vide, donc le formulaire n'est pas valide
        firstnameSpan.textContent = "Ce champ ne peut être vide"; // Affichage d'un message d'erreur
    } else {
        firstnameSpan.textContent = ""; // Effacement du message d'erreur
    }

    // Validation de la date de naissance
    var birthdateSpan = document.getElementById('birthdateSpan');
    if (dateNaissance.trim() !== '' && !isValidDate(dateNaissance)) {
        isValid = false; // La date est invalide, donc le formulaire n'est pas valide
        birthdateSpan.textContent = "Date invalide (donnée facultative)"; // Affichage d'un message d'erreur
    } else {
        birthdateSpan.textContent = ""; // Effacement du message d'erreur
    }

    // Validation du nom d'utilisateur
    var usernameSpan = document.getElementById('usernameSpan');
    if (username.trim().length < 6) {
        isValid = false; // Le nom d'utilisateur est trop court, donc le formulaire n'est pas valide
        usernameSpan.textContent = "Minimum 6 caractères"; // Affichage d'un message d'erreur
    } else {
        usernameSpan.textContent = ""; // Effacement du message d'erreur
    }

    // Validation du mot de passe
    var userpwdSpan = document.getElementById('userpwdSpan');
    if (!isValidPassword(password)) {
        isValid = false; // Le mot de passe ne respecte pas les critères, donc le formulaire n'est pas valide
        userpwdSpan.textContent = "Doit contenir au moins 12 caractères avec au moins une majuscule, une minuscule, un chiffre et l'un des caractères spéciaux suivants (_-;:!?./*&$)"; // Affichage d'un message d'erreur
    } else {
        userpwdSpan.textContent = ""; // Effacement du message d'erreur
    }

    // Validation de l'adresse e-mail
    var useremailSpan = document.getElementById('useremailSpan');
    if (!isValidEmail(email)) {
        isValid = false; // L'adresse e-mail est invalide, donc le formulaire n'est pas valide
        useremailSpan.textContent = "Veuillez saisir une adresse e-mail valide"; // Affichage d'un message d'erreur
    } else {
        useremailSpan.textContent = ""; // Effacement du message d'erreur
    }

    // Activation ou désactivation du bouton de soumission en fonction de la validité du formulaire
    document.getElementById('submitBtn').disabled = !isValid;

    return isValid; // Renvoi du statut de validation du formulaire
}

/*************************** Visibilité du Mot de passe ***************************/

// Gestion de la visibilité du mot de passe
var spanVisibility = document.getElementById("visibility-pwd");
if (spanVisibility !== null) {
    spanVisibility.addEventListener("click", function () {
        var inputpwd = document.getElementById("userpwd");
        if (inputpwd.type === "password") {
            spanVisibility.textContent = "visibility_off"; // Changement de l'icône pour masquer le mot de passe
            document.getElementById("userpwd").type = "text"; // Changement du type d'entrée pour afficher le mot de passe
        } else {
            spanVisibility.textContent = "visibility"; // Changement de l'icône pour afficher le mot de passe
            document.getElementById("userpwd").type = "password"; // Changement du type d'entrée pour masquer le mot de passe
        }
    });

    document.getElementById("userpwd").type = "password"; // Par défaut, le type d'entrée est 'password'
    spanVisibility.textContent = "visibility"; // Par défaut, l'icône est 'visibility'
}

/*************************** Retour au formulaire de connexion ***************************/

// Gestion du retour au formulaire de connexion
var retour = document.getElementById("retour");
if (retour !== null) {
    retour.addEventListener("click", function () {
        // Masquage de l'élément de connexion réussie et affichage du formulaire de connexion
        document.getElementById("connect").style.display = "none"; // On cache les liens lorsque on est deconnecter
        document.getElementById("connexion").style.display = "flex"; // On affiche les lien de connection
        document.getElementById("messageLog").textContent = "Déconnecté"; // Message de déconnexion
    });
}
