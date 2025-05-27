const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const usuarioRoutes = require('./routes/usuarios');
app.use('/api/usuarios', usuarioRoutes);

app.use(express.static(path.join(__dirname, '../login')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../login/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../login/register.html'));
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
