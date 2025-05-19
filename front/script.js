let contadorC = 0; // cantidad de clics
let contadorP = 0; // puntaje
let tiempoRestante = 30;
let intervalo;

function iniciarJuego() {
    contadorC = 0;
    contadorP = 0;
    tiempoRestante = 30;

    document.getElementById("puntaje").innerHTML = 0;
    document.getElementById("clicks").innerHTML = 0;
    document.getElementById("temporizador").innerHTML = tiempoRestante;
    document.getElementById("resetBtn").style.display = "none";
    document.getElementById("counter").style.display = "block";
    document.getElementById("startBtn").style.display = "none";

    intervalo = setInterval(() => {
        tiempoRestante--;
        document.getElementById("temporizador").innerHTML = tiempoRestante;

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
    document.getElementById("puntaje").innerHTML = contadorP * 50;
    document.getElementById("clicks").innerHTML = contadorC;
    moverPunto();
}

function moverPunto() {
    const punto = document.getElementById("counter");
    const areaJuego = document.getElementById("areaJuego");

    const maxX = areaJuego.clientWidth - punto.offsetWidth;
    const maxY = areaJuego.clientHeight - punto.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    punto.style.left = `${randomX}px`;
    punto.style.top = `${randomY}px`;
}

function finalizarJuego() {
    clearInterval(intervalo);
    document.getElementById("counter").style.display = "none";
    document.getElementById("resetBtn").style.display = "block";
}

function resetCounter() {
    document.getElementById("puntaje").innerHTML = 0;
    document.getElementById("clicks").innerHTML = 0;
    document.getElementById("temporizador").innerHTML = 30;
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("resetBtn").style.display = "none";
}
