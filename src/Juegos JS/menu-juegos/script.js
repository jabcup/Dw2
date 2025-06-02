document.addEventListener('DOMContentLoaded', function() {
    const juegoCarousel = document.getElementById('juegoCarousel');
    const descripcionJuego = document.getElementById('descripcionJuego');
    const reglasJuego = document.getElementById('reglasJuego');
    const puntajesJuego = document.querySelector('#puntajesJuego tbody');
    
    let juegos = [];
    let juegoSeleccionado = null;

    // Función para cargar los juegos disponibles
    function cargarJuegosDisponibles() {
        fetch('/jugador/juegos-disponibles', {
            method: 'GET',
            credentials: 'include' // Importante para enviar las cookies
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudieron cargar los juegos');
            }
            return response.json();
        })
        .then(data => {
            juegos = data;
            mostrarJuegos();
            if (juegos.length > 0) {
                seleccionarJuego(juegos[0]);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            juegoCarousel.innerHTML = '<p>Error al cargar los juegos. Intenta recargar la página.</p>';
        });
    }

    // Función para mostrar los juegos en el carrusel
    function mostrarJuegos() {
        juegoCarousel.innerHTML = '';
        
        juegos.forEach(juego => {
            const juegoElement = document.createElement('div');
            juegoElement.className = `juego ${juego.adquirido ? 'adquirido' : 'no-adquirido'}`;
            juegoElement.innerHTML = `
                <img src="${juego.Miniatura || 'img/default-game.png'}" alt="${juego.Nombre}">
                <h3>${juego.Nombre}</h3>
                ${juego.adquirido ? '<span class="adquirido-badge">ADQUIRIDO</span>' : 
                  `<button class="comprar-btn" data-id="${juego.ID_Juego}">Comprar $${juego.Precio}</button>`}
            `;
            
            juegoElement.addEventListener('click', () => seleccionarJuego(juego));
            juegoElement.addEventListener('mouseover', () => mostrarInfoHover(juego));
            
            juegoCarousel.appendChild(juegoElement);
        });
    }

    // Función para mostrar información al hacer hover
    function mostrarInfoHover(juego) {
        descripcionJuego.querySelector('p').textContent = juego.Descripcion || 'No hay descripción disponible';
    }

    // Función para seleccionar un juego
    function seleccionarJuego(juego) {
        juegoSeleccionado = juego;
        
        // Actualizar descripción
        descripcionJuego.querySelector('p').textContent = juego.Descripcion || 'No hay descripción disponible';
        
        // Actualizar reglas
        reglasJuego.querySelector('p').textContent = juego.Reglas || 'No hay reglas disponibles';
        
        // Actualizar puntajes
        actualizarPuntajes(juego);
    }

    // Función para actualizar los puntajes
    function actualizarPuntajes(juego) {
        puntajesJuego.innerHTML = '';
        
        if (juego.mejor_puntaje) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>1</td>
                <td>${juego.mejor_puntaje}</td>
                <td>${new Date().toLocaleDateString()}</td>
            `;
            puntajesJuego.appendChild(row);
        } else {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="3">No hay puntajes registrados</td>';
            puntajesJuego.appendChild(row);
        }
    }

    // Event listener para botones de compra
    juegoCarousel.addEventListener('click', function(e) {
        if (e.target.classList.contains('comprar-btn')) {
            e.stopPropagation();
            const idJuego = e.target.getAttribute('data-id');
            comprarJuego(idJuego);
        }
    });

    // Función para comprar un juego
    function comprarJuego(idJuego) {
        fetch('/jugador/comprar-juego', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idJuego: idJuego })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Juego adquirido con éxito!');
                cargarJuegosDisponibles(); // Recargar la lista
            } else {
                alert('Error al adquirir el juego: ' + (data.error || ''));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al procesar la compra');
        });
    }

    // Inicializar
    cargarJuegosDisponibles();
});