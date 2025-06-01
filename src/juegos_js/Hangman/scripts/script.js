const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const PlayAgainBtn = document.querySelector(".play-again");
const puntajeDisplay = document.getElementById("puntaje");

let currentWord, corectLetters, wrongGuessCount;
const maxGuesses = 6;
let contadorP = 0;  // puntaje acumulado

const resetGame = () => {
    corectLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word); 
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `Tu buscas la palabra:` : `La palabra correcta es:`;
        gameModal.querySelector("img").src = `img/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Felicidades!' : 'Perdiste!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");

        if(isVictory) {
            contadorP += 50;  // suma 50 puntos por palabra acertada
            puntajeDisplay.innerText = contadorP;
        }

        // Obtener idJuego dinámico del body
        const idJuego = parseInt(document.body.dataset.juego);

        // Enviar puntaje acumulado al backend
        fetch('http://localhost:4000/api/scores', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                idJuego: idJuego,
                puntaje: contadorP
            })
        })
        .then(res => {
            if(!res.ok) throw new Error("Respuesta no OK del servidor");
            return res.json();
        })
        .then(data => console.log('Score guardado:', data))
        .catch(error => console.error('Error al guardar puntaje:', error));

    }, 300);
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                corectLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        wrongGuessCount++;
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(corectLetters.length === currentWord.length) return gameOver(true);
}

// Crear botones del teclado
for(let i=97; i<=122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
PlayAgainBtn.addEventListener("click", getRandomWord);
