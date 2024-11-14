let motAleatoire;
let motCache;
let tentatives = 10;
let etapes = [];
let currentEtape = 0;
let jeuActif = false;

const mots = [
    "abacaba", "bonjour", "javascript", "pendu", "ordinateur", "developpeur", "openai"
];

const etapesPendu = [
    "______\n|\n|\n|\n|\n|____",
    "______\n|  O\n|\n|\n|\n|____",
    "______\n|  O\n|  |\n|\n|\n|____",
    "______\n|  O\n| /|\n|\n|\n|____",
    "______\n|  O\n| /|\\\n|\n|\n|____",
    "______\n|  O\n| /|\\\n| /\n|\n|____",
    "______\n|  O\n| /|\\\n| /\\\n|\n|____"
];

function choisirMot() {
    const index = Math.floor(Math.random() * mots.length);
    motAleatoire = mots[index].toLowerCase();
    motCache = motAleatoire.split('').map(char => '_').join('');
    document.getElementById('motCache').textContent = motCache;
    document.getElementById('tentatives').querySelector('span').textContent = tentatives;
    document.getElementById('etapesPendu').textContent = etapesPendu[0];
}

function afficherMessage(message) {
    document.getElementById('message').textContent = message;
}

function jouer() {
    jeuActif = true;
    tentatives = 10;
    currentEtape = 0;
    choisirMot();
    document.getElementById('proposition').disabled = false;
    document.getElementById('submitProposition').disabled = false;
    document.getElementById('playButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
    document.getElementById('message').textContent = "";
}

function arreter() {
    jeuActif = false;
    document.getElementById('proposition').disabled = true;
    document.getElementById('submitProposition').disabled = true;
    document.getElementById('playButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
    afficherMessage(`Partie terminée ! Le mot était : ${motAleatoire}`);
}

function proposer() {
    const proposition = document.getElementById('proposition').value.toLowerCase();

    if (proposition.length !== 1) {
        afficherMessage("Veuillez entrer une seule lettre !");
        return;
    }

    if (motAleatoire.includes(proposition)) {
        let tempMotCache = motCache.split('');
        for (let i = 0; i < motAleatoire.length; i++) {
            if (motAleatoire[i] === proposition && tempMotCache[i] === '_') {
                tempMotCache[i] = proposition;
            }
        }
        motCache = tempMotCache.join('');
        document.getElementById('motCache').textContent = motCache;
        afficherMessage("Bonne lettre !");
    } else {
        tentatives--;
        if (tentatives === 0) {
            arreter();
            return;
        }
        currentEtape++;
        document.getElementById('tentatives').querySelector('span').textContent = tentatives;
        document.getElementById('etapesPendu').textContent = etapesPendu[currentEtape];
        afficherMessage("Lettre incorrecte !");
    }

    if (motCache === motAleatoire) {
        afficherMessage(`Félicitations ! Vous avez deviné le mot : ${motAleatoire}`);
        arreter();
    }
}

document.getElementById('playButton').addEventListener('click', jouer);
document.getElementById('stopButton').addEventListener('click', arreter);
document.getElementById('submitProposition').addEventListener('click', proposer);
