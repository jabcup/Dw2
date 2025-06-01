const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

// 🟡 NUEVA función para enviar el puntaje final
const enviarPuntajeFinal = () => {
    const idJuego = parseInt(document.body.dataset.juego);

    fetch('http://localhost:4000/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            idJuego: idJuego,
            puntaje: score
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al enviar puntaje");
        return res.json();
    })
    .then(data => console.log("Puntaje enviado:", data))
    .catch(err => console.error("Error:", err));
};

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
    clearInterval(setIntervalId);

    // 🔴 Solo enviamos puntaje si es mayor a 0
    if (score > 0) enviarPuntajeFinal();

    alert("Game Over! Presiona OK para reintentar...");
    location.reload();
};

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
});

const initGame = () => {
    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score = score + 50;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for(let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
