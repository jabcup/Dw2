const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const puntajeDisplay = document.getElementById("puntaje");

let correctWord;
let timer;
let puntaje = 0;

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
    .then(res => {
        if (!res.ok) throw new Error("Error al guardar puntaje");
        return res.json();
    })
    .then(data => console.log('Puntaje final enviado:', data))
    .catch(error => console.error('Error al enviar puntaje:', error));
};

const initTimer = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }

        clearInterval(timer);
        alert(`¡Tiempo agotado! La palabra correcta era: ${correctWord.toUpperCase()}`);
        
        // Enviar puntaje solo al final
        if (puntaje > 0) enviarPuntajeFinal();

        // Reiniciar puntaje
        puntaje = 0;
        puntajeDisplay.innerText = puntaje;

        initGame();
    }, 1000);
};

const initGame = () => {
    initTimer(30);
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
    if (!userWord) return alert("Por favor, ingresa una palabra.");
    if (userWord !== correctWord) return alert(`¡Incorrecto! ${userWord} no es la palabra correcta.`);

    alert(`¡Correcto! ${userWord.toUpperCase()} es la palabra correcta.`);
    
    // Aumentar el puntaje
    puntaje += 50;
    puntajeDisplay.innerText = puntaje;

    initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

initGame();
