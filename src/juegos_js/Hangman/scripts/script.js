const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const PlayAgainBtn = document.querySelector(".play-again");
const nextWordBtn = document.querySelector(".next-word");
const goMenuBtn = document.querySelector(".go-menu");
const puntajeDisplay = document.getElementById("puntaje");

let currentWord, corectLetters, wrongGuessCount;
const maxGuesses = 6;
let contadorP = 0;
let juegoTerminado = false;

const resetGame = () => {
    corectLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
    juegoTerminado = false;
};

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const guardarPuntaje = () => {
    const idJuego = parseInt(document.body.dataset.juego);
    fetch('http://localhost:4000/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            idJuego: idJuego,
            puntaje: contadorP
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Respuesta no OK del servidor");
        return res.json();
    })
    .then(data => console.log('Score guardado:', data))
    .catch(error => console.error('Error al guardar puntaje:', error));
};

const gameOver = (isVictory) => {
    juegoTerminado = true;

    setTimeout(() => {
        const modalText = isVictory ? `¡Adivinaste la palabra:` : `La palabra correcta era:`;
        gameModal.querySelector("img").src = `img/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = isVictory ? '¡Felicidades!' : '¡Perdiste!';
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");

        nextWordBtn.style.display = isVictory ? "inline-block" : "none";
        PlayAgainBtn.style.display = isVictory ? "none" : "inline-block";
        goMenuBtn.style.display = "inline-block";

        if (isVictory) {
            contadorP += 50;
            puntajeDisplay.innerText = contadorP;
        } else {
            guardarPuntaje(); // Solo guardar puntaje al perder
        }
    }, 300);
};

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                corectLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (corectLetters.length === currentWord.length) return gameOver(true);
};

// Crear botones del teclado
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

PlayAgainBtn.addEventListener("click", () => {
    // Reinicia contador y juego si el jugador perdió
    contadorP = 0;
    puntajeDisplay.innerText = contadorP;
    getRandomWord();
});

nextWordBtn.addEventListener("click", getRandomWord);

goMenuBtn.addEventListener("click", () => {
    // Guardar puntaje final si ganó al menos una ronda antes de ir al menú
    if (contadorP > 0 && juegoTerminado) {
        guardarPuntaje();
    }
    window.location.href = "/juegos/menu-juegos/index.html"; // Ajusta según tu ruta real
});
