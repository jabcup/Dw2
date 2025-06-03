document.addEventListener('DOMContentLoaded', () => {
  const juegoCarousel = document.getElementById('juegoCarousel');
  const descripcionEl = document.getElementById('descripcionJuego').querySelector('p');
  const reglasEl = document.getElementById('reglasJuego').querySelector('p');
  const puntajesBody = document.querySelector('#puntajesJuego tbody');

  // Función para mostrar puntajes
  function mostrarPuntajes(idJuego) {
    fetch(`/api/puntajesG/${idJuego}`)
      .then(res => res.json())
      .then(data => {
        puntajesBody.innerHTML = ''; // Limpiar tabla

        if (data.success && data.puntajes.length > 0) {
          data.puntajes.forEach((p, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${index + 1}</td>
              <td>${p.Puntaje}</td>
              <td>${p.Nickname}</td>
              <td>${new Date(p.Fecha).toLocaleString()}</td>
            `;
            puntajesBody.appendChild(tr);
          });
        } else {
          const tr = document.createElement('tr');
          tr.innerHTML = `<td colspan="3">No hay puntajes aún.</td>`;
          puntajesBody.appendChild(tr);
        }
      })
      .catch(err => {
        console.error('Error al obtener puntajes:', err);
        puntajesBody.innerHTML = '<tr><td colspan="3">Error al cargar puntajes.</td></tr>';
      });
  }

  // 1. Obtener los juegos del backend
  fetch('/api/mis-juegos')
    .then(res => res.json())
    .then(data => {
      if (!data.success) throw new Error('Error al obtener juegos');

      // 2. Crear miniaturas por cada juego
      data.juegos.forEach(juego => {
        const divJuego = document.createElement('div');
        divJuego.classList.add('juego');

        const img = document.createElement('img');
        img.src = '/' + juego.Miniatura;
        img.alt = juego.Nombre;
        img.title = juego.Nombre;

        // 3. Mostrar descripción, reglas y puntajes al pasar el mouse
        divJuego.addEventListener('mouseenter', () => {
          descripcionEl.innerText = juego.Descripcion || 'Sin descripción.';
          reglasEl.innerText = juego.Reglas || 'Sin reglas.';
          mostrarPuntajes(juego.ID_Juego); // 👈 esta es la parte nueva
        });

        // 4. Clic: Ir al juego
        divJuego.addEventListener('click', () => {
          window.location.href = '/' + juego.RutaHTML;
        });

        divJuego.appendChild(img);
        juegoCarousel.appendChild(divJuego);
      });
    })
    .catch(err => {
      console.error('Error:', err);
    });
});
