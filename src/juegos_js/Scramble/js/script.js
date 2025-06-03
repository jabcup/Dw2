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
const menuBtn = document.querySelector(".menu-btn");

// Variables de juego mejoradas
let correctWord;
let timer;
let puntaje = 0;
let tiempoRestante = 30;
let gameActive = true;
let palabrasAcertadas = 0;
const tiempoBase = 30;
const puntosPorAcierto = 50;
const bonusPorRacha = 25;

// Efectos de sonido (opcional)
const playSound = (type) => {
    if (type === 'win') {
        // new Audio('sounds/win.mp3').play();
        console.log('¡Sonido de victoria!');
    } else if (type === 'lose') {
        // new Audio('sounds/lose.mp3').play();
        console.log('Sonido de derrota');
    }
};

// Animación de feedback
const showFeedback = (isCorrect) => {
    // Eliminar cualquier feedback previo
    const existingFeedback = document.querySelector('.feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('div');
    feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.textContent = isCorrect ? `¡Correcto! +${puntosPorAcierto}` : '¡Incorrecto!';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.classList.add('fade-out');
        setTimeout(() => feedback.remove(), 500);
    }, 1000);
};

// Mejorado: Envío de puntaje con más datos
const enviarPuntajeFinal = () => {
    const idJuego = parseInt(document.body.dataset.juego);

    fetch('http://localhost:4000/api/scores', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            idJuego: idJuego,
            puntaje: puntaje,
            palabrasAcertadas: palabrasAcertadas,
            tiempoJugado: (palabrasAcertadas * tiempoBase) - tiempoRestante
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
    })
    .then(data => console.log('Puntaje enviado:', data))
    .catch(error => console.error('Error al enviar puntaje:', error));
};

// Temporizador mejorado con pausa
const iniciarTemporizador = () => {
    clearInterval(timer);
    tiempoRestante = tiempoBase;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        if (gameActive) {
            tiempoRestante--;
            updateTimerDisplay();
            
            if (tiempoRestante <= 0) {
                clearInterval(timer);
                mostrarModal();
                playSound('lose');
            }
        }
    }, 1000);
};

const updateTimerDisplay = () => {
    timeText.innerText = tiempoRestante;
    // Cambia el color cuando el tiempo es crítico
    timeText.style.color = tiempoRestante <= 10 ? '#ff1a2f' : '#12f7ff';
};

// Modal mejorado
const mostrarModal = () => {
    gameActive = false;
    respuestaCorrecta.textContent = correctWord.toUpperCase();
    modal.style.display = "flex";
    enviarPuntajeFinal();
};

// Reinicio completo del juego
const reiniciarJuego = () => {
    modal.style.display = "none";
    puntaje = 0;
    palabrasAcertadas = 0;
    puntajeDisplay.innerText = puntaje;
    gameActive = true;
    iniciarTemporizador();
    initGame();
    inputField.focus();
};

// Inicialización mejorada del juego
const initGame = () => {
    const randomObj = words[Math.floor(Math.random() * words.length)];
    const wordArray = randomObj.word.split("");
    
    // Mezcla más efectiva
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    inputField.focus();
};

// Verificación de palabra mejorada
const checkWord = () => {
    if (!gameActive) return;
    
    const userWord = inputField.value.trim().toLowerCase();
    if (!userWord) {
        showFeedback(false);
        return;
    }

    if (userWord === correctWord) {
        // Bonus por racha
        const bonus = palabrasAcertadas > 0 && palabrasAcertadas % 3 === 0 ? bonusPorRacha : 0;
        puntaje += puntosPorAcierto + bonus;
        palabrasAcertadas++;
        
        puntajeDisplay.innerText = puntaje;
        showFeedback(true);
        playSound('win');
        
        // Feedback visual de bonus
        if (bonus > 0) {
            const bonusFeedback = document.createElement('div');
            bonusFeedback.className = 'feedback bonus';
            bonusFeedback.textContent = `¡Racha! +${bonus}`;
            document.body.appendChild(bonusFeedback);
            setTimeout(() => bonusFeedback.remove(), 1500);
        }
        
        // Limpiar el input y preparar nueva palabra
        inputField.value = "";
        initGame();
        iniciarTemporizador();
    } else {
        showFeedback(false);
        inputField.value = "";
        inputField.focus(); // Mantener foco en el input para seguir intentando
    }
};

// Event listeners mejorados
reiniciarBtn.addEventListener("click", reiniciarJuego);

refreshBtn.addEventListener("click", () => {
    if (gameActive) {
        initGame();
        iniciarTemporizador();
    }
});

checkBtn.addEventListener("click", checkWord);

// Permitir usar Enter para verificar
inputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWord();
    }
});

// Botón de menú
menuBtn.addEventListener("click", () => {
    if (puntaje > 0) {
        enviarPuntajeFinal();
    }
    window.location.href = "/juegos/menu-juegos/index.html";
});

// Iniciar juego
puntajeDisplay.innerText = puntaje;
initGame();
iniciarTemporizador();

// CSS dinámico para feedback
const style = document.createElement('style');
style.textContent = `
    .feedback {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 15px 30px;
        border-radius: 50px;
        font-size: 2rem;
        font-weight: bold;
        z-index: 1000; /* Asegúrate que esté por encima de todo */
        opacity: 1;
        transition: opacity 0.5s;
        pointer-events: none; /* Para que no interfiera con los clicks */
    }
    .correct {
        background-color: #22ff1a;
        color: #0f1923;
        box-shadow: 0 0 20px rgba(34, 255, 26, 0.7);
    }
    .incorrect {
        background-color: #ff1a2f;
        color: white;
        box-shadow: 0 0 20px rgba(255, 26, 47, 0.7);
    }
    .bonus {
        background-color: #12f7ff;
        color: #0f1923;
        top: 40%;
        box-shadow: 0 0 20px rgba(18, 247, 255, 0.7);
    }
    .fade-out {
        opacity: 0 !important;
    }
`;
document.head.appendChild(style);