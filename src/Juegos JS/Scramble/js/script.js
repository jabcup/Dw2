const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord;
let timer;

const initTimer = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`¡Tiempo agotado! La palabra correcta era: ${correctWord.toUpperCase()}`);
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
    initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

initGame();
