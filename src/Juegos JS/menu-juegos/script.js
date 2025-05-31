const juegos = [
  {
    id: 1,
    nombre: "Juego 1",
    imagen: "/img/portada1.jpg",
    descripcion: "Un emocionante reto de reflejos.",
    reglas: "Presiona las teclas correctas lo más rápido posible.",
    puntajes: [
      { puntaje: 1200, fecha: "2025-05-20" },
      { puntaje: 980, fecha: "2025-05-18" }
    ]
  },
  {
    id: 2,
    nombre: "Juego 2",
    imagen: "/img/portada2.jpg",
    descripcion: "Desafía tu precisión con el mouse.",
    reglas: "Haz clic sobre los objetivos lo más rápido posible.",
    puntajes: [
      { puntaje: 1500, fecha: "2025-05-25" },
      { puntaje: 1100, fecha: "2025-05-21" }
    ]
  },
    {
    id: 1,
    nombre: "Juego 1",
    imagen: "img/portada1.jpg",
    descripcion: "Un emocionante reto de reflejos.",
    reglas: "Presiona las teclas correctas lo más rápido posible.",
    puntajes: [
      { puntaje: 1200, fecha: "2025-05-20" },
      { puntaje: 980, fecha: "2025-05-18" }
    ]
  },
    {
    id: 1,
    nombre: "Juego 1",
    imagen: "img/portada1.jpg",
    descripcion: "Un emocionante reto de reflejos.",
    reglas: "Presiona las teclas correctas lo más rápido posible.",
    puntajes: [
      { puntaje: 1200, fecha: "2025-05-20" },
      { puntaje: 980, fecha: "2025-05-18" }
    ]
  },
    {
    id: 1,
    nombre: "Juego 1",
    imagen: "img/portada1.jpg",
    descripcion: "Un emocionante reto de reflejos.",
    reglas: "Presiona las teclas correctas lo más rápido posible.",
    puntajes: [
      { puntaje: 1200, fecha: "2025-05-20" },
      { puntaje: 980, fecha: "2025-05-18" }
    ]
  },
    {
    id: 1,
    nombre: "Juego 1",
    imagen: "img/portada1.jpg",
    descripcion: "Un emocionante reto de reflejos.",
    reglas: "Presiona las teclas correctas lo más rápido posible.",
    puntajes: [
      { puntaje: 1200, fecha: "2025-05-20" },
      { puntaje: 980, fecha: "2025-05-18" }
    ]
  },
    {
    id: 1,
    nombre: "Juego 1",
    imagen: "img/portada1.jpg",
    descripcion: "Un emocionante reto de reflejos.",
    reglas: "Presiona las teclas correctas lo más rápido posible.",
    puntajes: [
      { puntaje: 1200, fecha: "2025-05-20" },
      { puntaje: 980, fecha: "2025-05-18" }
    ]
  },
    {
    id: 1,
    nombre: "Juego 1",
    imagen: "img/portada1.jpg",
    descripcion: "Un emocionante reto de reflejos.",
    reglas: "Presiona las teclas correctas lo más rápido posible.",
    puntajes: [
      { puntaje: 1200, fecha: "2025-05-20" },
      { puntaje: 980, fecha: "2025-05-18" }
    ]
  },
    {
    id: 1,
    nombre: "Juego 1",
    imagen: "img/portada1.jpg",
    descripcion: "Un emocionante reto de reflejos.",
    reglas: "Presiona las teclas correctas lo más rápido posible.",
    puntajes: [
      { puntaje: 1200, fecha: "2025-05-20" },
      { puntaje: 980, fecha: "2025-05-18" }
    ]
  }
];

// Cargar juegos
const juegoCarousel = document.getElementById("juegoCarousel");
const descripcionJuego = document.getElementById("descripcionJuego");
const reglasJuego = document.getElementById("reglasJuego");
const puntajesJuego = document.querySelector("#puntajesJuego tbody");

juegos.forEach(juego => {
  const div = document.createElement("div");
  div.classList.add("juego");
  div.innerHTML = `<img src="${juego.imagen}" alt="${juego.nombre}">`;

  div.addEventListener("mouseenter", () => {
    descripcionJuego.querySelector("p").textContent = juego.descripcion;
  });

  div.addEventListener("click", () => {
    reglasJuego.querySelector("p").textContent = juego.reglas;

    puntajesJuego.innerHTML = "";
    juego.puntajes.forEach((p, i) => {
      puntajesJuego.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${p.puntaje}</td>
          <td>${p.fecha}</td>
        </tr>
      `;
    });
  });

  juegoCarousel.appendChild(div);
});
