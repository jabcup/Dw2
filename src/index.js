const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({
  origin: 'http://localhost', // o el puerto de tu frontend
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usuarioRoutes = require('./routes/usuarios');
app.use('/api/usuarios', usuarioRoutes);

const jugadoresRoutes = require('./routes/jugadoresADMI');
app.use('/api/jugadores', jugadoresRoutes);

const juegosRoutes = require('./routes/juegosADMI');
app.use('/api/juegos', juegosRoutes);

const juegoJugadorRoutes = require('./routes/juegoJugadorADMI');
app.use('/api/juegos-jugadores', juegoJugadorRoutes);

const puntajesRoutes = require('./routes/puntajesADMI');
app.use('/api/puntajes', puntajesRoutes);

app.use(express.static(path.join(__dirname, '../login')));

app.use(express.static(path.join(__dirname, '../Administrador')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../login/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../login/register.html'));
});

// Agrega esto junto con tus otras rutas:
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../Administrador/jugadores.html'));
});

// Socket.IO
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

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
