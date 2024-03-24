/** ChatBox.js
 * Ce script gère l'envoi de messages via un formulaire, la récupération des messages depuis le serveur,
 * l'affichage des messages reçus et la gestion des erreurs de communication avec le serveur.
 *
 * @author Lucas BATTAGLIA
 * @contact Lucas.battaglia@etu.uca.fr
 * @date 24/03/2024
 */

/****************envois des messages*****************/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("Chat");

    if (form !== null) {
        const messageLog = document.getElementById("messageLog");

        /**
         * Gère la soumission du formulaire de chat.
         * Envoie le message saisi au serveur et affiche les messages de retour.
         *
         * @param {Event} event - L'événement de soumission du formulaire.
         */
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            // Récupération du message saisi par l'utilisateur
            const message = document.getElementById("msg");
            const messageValue = message.value;

            // Envoi du message au serveur via une requête XMLHttpRequest
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        // Traitement de la réponse du serveur
                        const response = JSON.parse(xhr.responseText);

                        // Affichage du message de retour
                        const num = response.num;
                        const msgRetour = response.msg;
                        if (num !== 0) {
                            messageLog.className = 'erreur'; // Affichage d'un message d'erreur
                        } else {
                            messageLog.className = 'connecter'; // Affichage d'un message de succès
                            message.value = ""; // Effacement du champ de saisie
                            getMessagesFromServer(); // Mise à jour des messages affichés
                        }
                        messageLog.textContent = msgRetour; // Affichage du message de retour
                        messageLog.style.display = "inline"; // Affichage du message de retour
                    } else {
                        alert("Une erreur s'est produite lors de la requête."); // Alerte en cas d'erreur de requête
                    }
                }
            };
            xhr.open("POST", "htbin/chatsend.py", true); // Ouverture de la requête POST vers le serveur
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // Envoi du message au serveur
            xhr.send("msg=" + encodeURIComponent(messageValue));
        });
    }
});


/**************recuperation des messages*********************/

// Fonction pour récupérer les messages depuis le serveur Python
function getMessagesFromServer() {
    // Création d'un objet XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Spécification de la méthode HTTP et de l'URL du serveur Python
    xhr.open("GET", "htbin/chatget.py", true);

    // Gestionnaire d'événement pour le chargement de la réponse
    xhr.onload = function () {
        // Vérification du statut de la réponse
        if (xhr.status === 200) {
            // Analyse de la réponse JSON
            var response = JSON.parse(xhr.responseText);

            // Traitement des données
            processMessages(response);
        } else {
            // En cas d'erreur, afficher un message d'erreur
            console.error('Une erreur est survenue lors de la récupération des messages.');
        }
    };

    // Gestionnaire d'événement pour la gestion des erreurs de connexion
    xhr.onerror = function () {
        console.error('Erreur de connexion au serveur.');
    };

    // Envoi de la requête
    xhr.send();
}

/**
 * Traite les messages récupérés depuis le serveur et les affiche dans l'interface utilisateur.
 *
 * @param {Array} messages - Les messages récupérés depuis le serveur.
 */
function processMessages(messages) {
    // Parcours de chaque message dans la liste
    for (var i = nbMessage; i < messages.length; i++) {
        // Accès aux champs de chaque message
        var message = messages[i];
        var date = message.date;
        var time = message.time;
        var user = message.user;
        var msg = message.msg;

        // Création des éléments HTML pour afficher le message
        var SpanMessage = document.createElement("span");
        SpanMessage.setAttribute('class', "spanMessage");
        SpanMessage.innerHTML = msg.replace(/\n/g, "<br/>");

        var SpanAuteur = document.createElement("span");
        SpanAuteur.setAttribute('class', "spanAuteur");
        SpanAuteur.textContent = user;

        var SpanDate = document.createElement("span");
        SpanDate.setAttribute('class', "spanDate");
        SpanDate.textContent = "le " + date + " à " + time;

        var DivMessage = document.createElement("div");
        DivMessage.setAttribute('class', "DivMessage");

        var messageChat = document.getElementById("messageChat");

        // Ajout des éléments HTML au conteneur des messages
        DivMessage.appendChild(SpanAuteur);
        DivMessage.appendChild(SpanDate);
        DivMessage.appendChild(SpanMessage);

        messageChat.prepend(DivMessage); // Ajout du message au début de la liste des messages
        nbMessage++; // Incrément du nombre total de messages affichés
    }
}

// Nombre total de messages affichés
var nbMessage = 0;

// Appel périodique de la fonction pour récupérer les messages depuis le serveur Python
setInterval(getMessagesFromServer, 5000);
