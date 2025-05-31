// const express = require('express');
// const http = require('http');
// const path = require('path');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Middleware CORS
// app.use(cors({
//   origin: 'http://localhost', // o el puerto de tu frontend
//   credentials: true
// }));

// // Middleware body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Rutas API
// const usuarioRoutes = require('./routes/usuarios');
// app.use('/api/usuarios', usuarioRoutes);

// const jugadoresRoutes = require('./routes/jugadoresADMI');
// app.use('/api/jugadores', jugadoresRoutes);

// const juegosRoutes = require('./routes/juegosADMI');
// app.use('/api/juegos', juegosRoutes);

// const juegoJugadorRoutes = require('./routes/juegoJugadorADMI');
// app.use('/api/juegos-jugadores', juegoJugadorRoutes);

// const puntajesRoutes = require('./routes/puntajesADMI');
// app.use('/api/puntajes', puntajesRoutes);

// // Servir archivos estáticos
// app.use(express.static(path.join(__dirname, '../login')));
// app.use(express.static(path.join(__dirname, '../Administrador')));

// // ✅ Esta línea permite acceder a /juegos/menu-juegos/index.html
// app.use('/juegos', express.static(path.join(__dirname, 'juegos_js')));

// // Rutas de página principal
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../login/login.html'));
// });

// app.get('/register', (req, res) => {
//   res.sendFile(path.join(__dirname, '../login/register.html'));
// });

// app.get('/admin', (req, res) => {
//   res.sendFile(path.join(__dirname, '../Administrador/jugadores.html'));
// });

// // Socket.IO
// io.on('connection', (socket) => {
//   console.log('Nuevo usuario conectado');

//   socket.on('unirseSala', ({ codigo, nombre }) => {
//     socket.join(codigo);
//     socket.to(codigo).emit('mensaje', {
//       nombre: 'Sistema',
//       mensaje: `${nombre} se unió a la sala.`
//     });
//   });

//   socket.on('mensaje', ({ codigo, nombre, mensaje }) => {
//     io.to(codigo).emit('mensaje', { nombre, mensaje });
//   });
// });

// // Puerto de escucha
// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });

const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Añadido para manejar cookies

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middlewares (con la adición de cookie-parser)
app.use(cors({
  origin: 'http://localhost', // Asegúrate que coincida con tu frontend
  credentials: true // Permite el envío de cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware para cookies

// Importar las rutas existentes
const usuarioRoutes = require('./routes/usuarios');
const jugadoresRoutes = require('./routes/jugadoresADMI');
const juegosRoutes = require('./routes/juegosADMI');
const juegoJugadorRoutes = require('./routes/juegoJugadorADMI');
const puntajesRoutes = require('./routes/puntajesADMI');

// Usar las rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/jugadores', jugadoresRoutes);
app.use('/api/juegos', juegosRoutes);
app.use('/api/juegos-jugadores', juegoJugadorRoutes);
app.use('/api/puntajes', puntajesRoutes);

// Rutas
const rutasJuegos = require('./routes/dispJuegosRoutes'); // asegúrate de usar la ruta correcta
app.use('/api', rutasJuegos); // ejemplo: http://localhost:3000/api/mis-juegos

const puntajesGeneralesRoutes = require('./routes/puntajeGeneralRoutes');
app.use('/api/puntajes', puntajesGeneralesRoutes);


// Servir archivos estáticos (sin cambios)
app.use(express.static(path.join(__dirname, '../login')));
app.use(express.static(path.join(__dirname, '../Administrador')));
app.use('/juegos', express.static(path.join(__dirname, 'juegos_js')));

// Rutas de página principal (sin cambios)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../login/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../login/register.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../Administrador/jugadores.html'));
});

// Socket.IO (sin cambios)
io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  socket.on('unirseSala', ({ codigo, nombre }) => {
    socket.join(codigo);
    socket.to(codigo).emit('mensaje', {
      nombre: 'Sistema',
      mensaje: `${nombre} se unió a la sala.`
    });
  });

  socket.on('mensaje', ({ codigo, nombre, mensaje }) => {
    io.to(codigo).emit('mensaje', { nombre, mensaje });
  });
});

// Puerto de escucha (sin cambios)
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});