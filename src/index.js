const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const cors = require('cors');

const supportRooms = new Map();

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
app.get('/admin-support', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-support.html'));
});
// Socket.IO
io.on('connection', (socket) => {
console.log('Nuevo usuario conectado');

  // Chat global
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

   // Sistema de soporte técnico
  socket.on('joinAdminDashboard', () => {
    socket.join('admin_dashboard');
    console.log('Administrador conectado al dashboard');
    
    // Enviar lista actual de salas
    const rooms = Array.from(supportRooms.values());
    socket.emit('supportRoomsList', rooms);
  });

  socket.on('requestSupport', (userData) => {
    const roomId = `support_${Date.now()}_${userData.id}`;
    
    // Añade esta línea para unir al cliente a la sala
    socket.join(roomId); // <--- SOLUCIÓN CLAVE

    const roomData = {
      roomId: roomId,
      userId: userData.id,
      userName: userData.name,
      status: 'waiting',
      createdAt: new Date(),
      socket: socket.id
    };
    
    supportRooms.set(roomId, roomData);
    socket.emit('supportRoomCreated', roomId);
    io.to('admin_dashboard').emit('newSupportRequest', roomData);
    
    console.log(`\n[SOPORTE] Nueva solicitud de ${userData.name} (ID: ${userData.id})`);
    console.log(`Sala: ${roomId}\n`);
  });

  socket.on('joinSupportRoom', (roomId, adminName) => {
    const room = supportRooms.get(roomId);
    if (room && room.status === 'waiting') {
        socket.join(roomId);
        room.status = 'active';
        room.adminName = adminName;
        room.adminSocket = socket.id;
        
        // Notificar al USUARIO que un admin se unió
        io.to(roomId).emit('supportJoined', {
            adminName: adminName
        });
        
        // Notificar a los admins
        const rooms = Array.from(supportRooms.values());
        io.to('admin_dashboard').emit('supportRoomsList', rooms);
        
        console.log(`\n[SOPORTE] Unido a sala ${roomId} | Usuario: ${room.userName}\n`);
    } else {
        console.log('\n[ERROR] Sala no disponible');
    }
  });

  // CORRECCIÓN CLAVE: Cambiar la estructura del evento supportMessage
  socket.on('supportMessage', (data) => {
      const { roomId, message, sender } = data;
      const room = supportRooms.get(roomId);
      
      if (room) {
          // CORRECCIÓN: Usar io.to para enviar a TODOS en la sala
          io.to(roomId).emit('supportMessage', {
              roomId: roomId,
              sender: sender,
              message: message,
              timestamp: new Date()
          });
          
          console.log(`[${roomId}] ${sender}: ${message}`);
      }
  });

  socket.on('closeSupportRoom', (roomId) => {
    if (supportRooms.has(roomId)) {
        // Notificar a los participantes
        io.to(roomId).emit('supportRoomClosed', { roomId: roomId });
        
        // Eliminar la sala
        supportRooms.delete(roomId);
        
        // Notificar a los admins
        const rooms = Array.from(supportRooms.values());
        io.to('admin_dashboard').emit('supportRoomsList', rooms);
        
        console.log(`\n[SOPORTE] Sala cerrada: ${roomId}`);
    }
  });

  socket.on('listSupportRooms', () => {
    const rooms = Array.from(supportRooms.values());
    socket.emit('supportRoomsList', rooms);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});