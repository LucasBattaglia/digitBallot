document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("Chat");

    if (form !== null) {
        const messageLog = document.getElementById("messageLog");

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const message = document.getElementById("msg");
            const messageValue = message.value;

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);

                        const num = response.num;
                        const msgRetour = response.msg;

                        if (num !== 0) {
                            messageLog.className = 'erreur';
                        } else {
                            messageLog.className = 'connecter';
                            message.value = "";
                            getMessagesFromServer();
                        }
                        messageLog.textContent = msgRetour;
                        messageLog.style.display = "inline";
                    } else {
                        alert("Une erreur s'est produite lors de la requête.");
                    }
                }
            };
            xhr.open("POST", "htbin/chatsend.py", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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

// Fonction pour traiter les messages récupérés
function processMessages(messages) {
    // Parcourir chaque message dans la liste
    for (var i = nbMessage; i < messages.length; i++) {
        // Accéder aux champs de chaque message
        var message = messages[i];
        var date = message.date;
        var time = message.time;
        var user = message.user;
        var msg = message.msg;

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

        DivMessage.appendChild(SpanAuteur);
        DivMessage.appendChild(SpanDate);
        DivMessage.appendChild(SpanMessage);

        messageChat.prepend(DivMessage);
        nbMessage++;
    }
}


var nbMessage = 0;
// Appel de la fonction pour récupérer les messages depuis le serveur Python
getMessagesFromServer();


setInterval(getMessagesFromServer, 5000);