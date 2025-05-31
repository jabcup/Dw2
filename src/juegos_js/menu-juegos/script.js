// script.js

document.addEventListener('DOMContentLoaded', () => {
  const juegoCarousel = document.getElementById('juegoCarousel');
  const descripcionEl = document.getElementById('descripcionJuego').querySelector('p');
  const reglasEl = document.getElementById('reglasJuego').querySelector('p');

  // 1. Obtener los juegos del backend
  fetch('/api/mis-juegos') // Asegúrate que esta ruta esté bien
    .then(res => res.json())
    .then(data => {
      if (!data.success) throw new Error('Error al obtener juegos');

      // 2. Por cada juego, crear su miniatura
      data.juegos.forEach(juego => {
        const divJuego = document.createElement('div');
        divJuego.classList.add('juego');
        console.log(juego.Miniatura)
        const img = document.createElement('img');
        img.src = '/'+juego.Miniatura;
        console.log(img.src)
        img.alt = juego.Nombre;
        img.title = juego.Nombre;

        // Mostrar descripción al hacer hover
        divJuego.addEventListener('mouseenter', () => {
          descripcionEl.innerText = juego.Descripcion;
          reglasEl.innerText = juego.Reglas;
        });

        // Mostrar reglas al hacer clic
        divJuego.addEventListener('click', () => {
          reglasEl.innerText = juego.Reglas;
          // Abrir el juego
          window.location.href = '/'+juego.RutaHTML;
        });

        divJuego.appendChild(img);
        juegoCarousel.appendChild(divJuego);
      });
    })
    .catch(err => {
      console.error('Error:', err);
    });
});
