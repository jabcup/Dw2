let contadorC = 0; // cantidad de clics
let contadorP = 0; // puntaje
let tiempoRestante = 30;
let intervalo;
let objetivoPuntos = 500;

const puntajeEl = document.getElementById("puntaje");
const clicksEl = document.getElementById("clicks");
const tiempoDisplay = document.getElementById("temporizador");
const counter = document.getElementById("counter");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const areaJuego = document.getElementById("areaJuego");

// Modal
const gameModal = document.createElement("div");
gameModal.classList.add("game-modal");
gameModal.innerHTML = `
  <div class="modal-content">
    <img id="modal-img" src="" alt="Resultado">
    <h2 id="modal-title"></h2>
    <p id="modal-text"></p>
    <button id="btn-volver">Volver al menú</button>
    <button id="btn-reiniciar">Reiniciar</button>
  </div>
`;
document.body.appendChild(gameModal);

// Referencias al contenido del modal
const modalImg = gameModal.querySelector("#modal-img");
const modalTitle = gameModal.querySelector("#modal-title");
const modalText = gameModal.querySelector("#modal-text");
const btnVolver = gameModal.querySelector("#btn-volver");
const btnReiniciar = gameModal.querySelector("#btn-reiniciar");

btnVolver.onclick = () => {
  window.location.href = "/juegos/menu-juegos/index.html";
};
btnReiniciar.onclick = () => {
  gameModal.classList.remove("show");
  resetCounter();
};

function iniciarJuego() {
  contadorC = 0;
  contadorP = 0;
  tiempoRestante = 30;
  objetivoPuntos = 1500;

  puntajeEl.innerHTML = 0;
  clicksEl.innerHTML = 0;
  tiempoDisplay.innerHTML = tiempoRestante;
  resetBtn.style.display = "none";
  counter.style.display = "block";
  startBtn.style.display = "none";

  intervalo = setInterval(() => {
    tiempoRestante--;
    tiempoDisplay.innerHTML = tiempoRestante;

    if (tiempoRestante <= 0) {
      finalizarJuego();
    }
  }, 1000);

  moverPunto();
}

function contadorClick() {
  if (tiempoRestante <= 0) return;

  contadorC++;
  contadorP++;
  puntajeEl.innerHTML = contadorP * 50;
  clicksEl.innerHTML = contadorC;
  moverPunto();
}

function moverPunto() {
  const maxX = areaJuego.clientWidth - counter.offsetWidth;
  const maxY = areaJuego.clientHeight - counter.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  counter.style.left = `${randomX}px`;
  counter.style.top = `${randomY}px`;
}

function finalizarJuego() {
  clearInterval(intervalo);
  counter.style.display = "none";

  const puntajeFinal = contadorP * 50;

  if (puntajeFinal >= objetivoPuntos) {
    // Continúa a la siguiente ronda
    objetivoPuntos += 1500;
    tiempoRestante = 30;
    tiempoDisplay.innerHTML = tiempoRestante;

    intervalo = setInterval(() => {
      tiempoRestante--;
      tiempoDisplay.innerHTML = tiempoRestante;
      if (tiempoRestante <= 0) {
        finalizarJuego();
      }
    }, 1000);

    counter.style.display = "block";
    moverPunto();
  } else {
    // El jugador perdió
    resetBtn.style.display = "block";

    modalImg.src = "img/lost.gif";
    modalTitle.innerText = "¡No alcanzaste el objetivo!";
    modalText.innerHTML = `
      Tu puntaje fue: <b>${puntajeFinal}</b><br>
      Objetivo era: ${objetivoPuntos}
    `;
    gameModal.classList.add("show");

    const idJuego = parseInt(document.body.dataset.juego);

    fetch('http://localhost:4000/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        idJuego: idJuego,
        puntaje: puntajeFinal
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Respuesta no OK del servidor");
      return res.json();
    })
    .then(data => console.log('Score guardado:', data))
    .catch(error => console.error('Error al guardar puntaje:', error));
  }
}

function resetCounter() {
  contadorC = 0;
  contadorP = 0;
  tiempoRestante = 30;
  objetivoPuntos = 500;

  puntajeEl.innerHTML = 0;
  clicksEl.innerHTML = 0;
  tiempoDisplay.innerHTML = tiempoRestante;

  resetBtn.style.display = "none";
  startBtn.style.display = "block";
}
