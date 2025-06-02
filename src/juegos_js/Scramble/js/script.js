const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const puntajeDisplay = document.getElementById("puntaje");

const modal = document.getElementById("game-over-modal");
const reiniciarBtn = document.getElementById("reiniciar-btn");
const respuestaCorrecta = document.getElementById("respuesta-correcta");

let correctWord;
let timer;
let puntaje = 0;
let tiempoRestante = 30;

const enviarPuntajeFinal = () => {
    const idJuego = parseInt(document.body.dataset.juego);

    fetch('http://localhost:4000/api/scores', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            idJuego: idJuego,
            puntaje: puntaje
        })
    })
    .then(res => res.json())
    .then(data => console.log('Puntaje enviado:', data))
    .catch(error => console.error('Error al enviar puntaje:', error));
};

const iniciarTemporizador = () => {
    clearInterval(timer);
    tiempoRestante = 30;
    timeText.innerText = tiempoRestante;

    timer = setInterval(() => {
        tiempoRestante--;
        timeText.innerText = tiempoRestante;

        if (tiempoRestante <= 0) {
            clearInterval(timer);
            mostrarModal();
        }
    }, 1000);
};

const mostrarModal = () => {
    respuestaCorrecta.textContent = correctWord.toUpperCase();
    modal.style.display = "flex";
    enviarPuntajeFinal();
};

reiniciarBtn.addEventListener("click", () => {
    modal.style.display = "none";
    puntaje = 0;
    puntajeDisplay.innerText = puntaje;
    iniciarTemporizador();
    initGame();
});

const initGame = () => {
    const randomObj = words[Math.floor(Math.random() * words.length)];
    const wordArray = randomObj.word.split("");

    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
};

const checkWord = () => {
    const userWord = inputField.value.toLowerCase();
    if (!userWord) return;

    if (userWord === correctWord) {
        puntaje += 50;
        puntajeDisplay.innerText = puntaje;
        initGame();
        iniciarTemporizador();
    } else {
        alert("¡Incorrecto!");
    }
};

refreshBtn.addEventListener("click", () => {
    initGame();
    iniciarTemporizador();
});
checkBtn.addEventListener("click", checkWord);

puntajeDisplay.innerText = puntaje;
initGame();
iniciarTemporizador();
