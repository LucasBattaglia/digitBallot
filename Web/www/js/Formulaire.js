/*********************** Formulaire de connexion *******************************/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("connexion");

    if (form !== null) {
        const messageLog = document.getElementById("messageLog");

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("userpwd").value;

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = xhr.responseText;
                        if (response.includes("Le nom d'utilisateur et le mot de passe sont invalide")) {
                            messageLog.className = 'erreur';
                        } else {
                            messageLog.className = 'connecter';
                            var connect = document.getElementById("connect");
                            if (connect !== null) {
                                form.style.display = "none";
                                connect.style.display = "block";
                            }
                        }
                        messageLog.textContent = response;
                    } else {
                        alert("Une erreur s'est produite lors de la requête.");
                    }
                }
            };
            xhr.open("POST", "htbin/login.py", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("username=" + encodeURIComponent(username) + "&userpwd=" + encodeURIComponent(password));
        });
    }
});


/**************** Formulaire d'inscription *********************/

var inputs = document.querySelectorAll('.card input');
inputs.forEach(function (input) {
    input.addEventListener('input', function () {
        validateForm();
    });
});

/**
 * Fonction pour la validité de la date de naissance
 * @param dateString Date a valider
 * @returns {boolean} True si la date est autoriser, False sinon
 */
function isValidDate(dateString) {
    var regEx = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateString.match(regEx)) return false;

    var parts = dateString.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var year = parseInt(parts[2], 10);

    var date = new Date(year, month, day);

    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

/**
 * Fonction pour la validité du mots de passe
 * @param password mots de passe a valider
 * @returns {boolean} True si le mots de passe est autoriser, False sinon
 */
function isValidPassword(password) {
    // Regex pour vérifier le mot de passe
    var regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_;:!?./*&$]).{12,}$/;
    return regEx.test(password);
}

/**
 * Fonction pour la validité de l'adresse mail
 * @param email adresse mail a valider
 * @returns {boolean} True si l'adresse est autoriser, False sinon
 */
function isValidEmail(email) {
    // Regex pour vérifier l'adresse email
    var regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEx.test(email);
}

/**
 * Fonction verifiant que chaque champs du formulaire soit correctement remplis
 * @returns {boolean} True si tout les champs du formulaire sont correctement remplis, False sinon
 */
function validateForm() {
    // On recupere les diferente valeur des champs du formulaire
    var nom = document.getElementById('lastname').value;
    var prenom = document.getElementById('firstname').value;
    var dateNaissance = document.getElementById('birthdate').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('userpwd').value;
    var email = document.getElementById('useremail').value;

    // booleen permettant de savoir si le formulaire est valide
    var isValid = true;

    // Vérification du nom
    var lastnameSpan = document.getElementById('lastnameSpan');
    if (nom.trim() === '') {
        // Afficher message d'erreur pour nom
        isValid = false;
        lastnameSpan.textContent = "Ce champs ne peut etre vide";
    } else {
        lastnameSpan.textContent = "";
    }

    // Vérification du prenom
    var firstnameSpan = document.getElementById('firstnameSpan');
    if (prenom.trim() === '') {
        // Afficher message d'erreur pour prénom
        isValid = false;
        firstnameSpan.textContent = "Ce champs ne peut etre vide";
    } else {
        firstnameSpan.textContent = "";
    }

    // Vérification de la date de naissance
    var birthdateSpan = document.getElementById('birthdateSpan');
    if (dateNaissance.trim() !== '' && !isValidDate(dateNaissance)) {
        // Afficher message d'erreur pour date de naissance
        isValid = false;
        birthdateSpan.textContent = "Date invalide (donnee facultative)";
    } else {
        birthdateSpan.textContent = "";
    }

    // Vérification du nom d'utilisateur
    var usernameSpan = document.getElementById('usernameSpan');
    if (username.trim().length < 6) {
        // Afficher message d'erreur pour nom d'utilisateur
        isValid = false
        usernameSpan.textContent = "minimun 6 caractere";
    } else {
        usernameSpan.textContent = "";
    }

    // Vérification du mot de passe
    var userpwdSpan = document.getElementById('userpwdSpan');
    if (!isValidPassword(password)) {
        // Afficher message d'erreur pour mot de passe
        isValid = false;
        userpwdSpan.textContent = "Doit contenir au moins 12 caractères dont une majuscule, une minuscule, un chiffre et l'un des caractères spéciaux suivants (_-;:!?./*&$)";
    } else {
        userpwdSpan.textContent = "";
    }

    // Vérification de l'adresse email
    var useremailSpan = document.getElementById('useremailSpan');
    if (!isValidEmail(email)) {
        // Afficher message d'erreur pour adresse email
        isValid = false;
        useremailSpan.textContent = "Veuillez saisir une adresse mail valide";
    } else {
        useremailSpan.textContent = "";
    }

    // Activer ou désactiver la soumission du formulaire en fonction de la validité des champs
    document.getElementById('submitBtn').disabled = !isValid;

    return isValid;
}

/*************************** Visibilité du Mot de passe ***************************/

var spanVisibility = document.getElementById("visibility-pwd");
if (spanVisibility !== null) {
    spanVisibility.addEventListener("click", function () {
        var inputpwd = document.getElementById("userpwd");
        if (inputpwd.type === "password") {
            spanVisibility.textContent = "visibility_off";
            document.getElementById("userpwd").type = "text";
        } else {
            spanVisibility.textContent = "visibility";
            document.getElementById("userpwd").type = "password";
        }
    });

    document.getElementById("userpwd").type = "password";
    spanVisibility.textContent = "visibility";
}

/*************************** Retour au formulaire de connection ***************************/

var retour = document.getElementById("retour");
if (retour !== null) {
    retour.addEventListener("click", function () {
        document.getElementById("connect").style.display = "none";
        document.getElementById("connexion").style.display = "flex";
        document.getElementById("messageLog").textContent = "Déconnecté"
    });
}