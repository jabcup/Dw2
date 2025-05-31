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

const supportRooms = new Map();

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
app.use('/juegos_js', express.static(path.join(__dirname, 'juegos_js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../login/login.html'));
});
app.use(express.static(path.join(__dirname, 'juegos_js/menu-juegos/img')));
// app.use(express.static(path.join(__dirname, 'juegos_js/menu-juegos')));
// app.get('/games', (req, res) => {
//   res.sendFile(path.join(__dirname, 'juegos_js/menu-juegos', 'index.html'));
// });



app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../login/register.html'));
});

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

// Manejo de desconexiones (agregar esto dentro de io.on('connection', ...))
socket.on('disconnect', () => {
  console.log(`Socket desconectado: ${socket.id}`);

  // 1. Limpiar salas de soporte donde participaba este socket (como usuario o admin)
  supportRooms.forEach((room, roomId) => {
    if (room.socket === socket.id || room.adminSocket === socket.id) {
      // Notificar al otro participante (si existe)
      const recipient = room.socket === socket.id ? room.adminSocket : room.socket;
      if (recipient && io.sockets.sockets.has(recipient)) {
        io.to(recipient).emit('supportRoomClosed', {
          reason: 'La otra parte se desconectó',
          roomId: roomId
        });
      }

      // Eliminar la sala
      supportRooms.delete(roomId);
      console.log(`Sala de soporte ${roomId} eliminada por desconexión`);
    }
  });

  // 2. Actualizar lista de salas para los admins
  const rooms = Array.from(supportRooms.values());
  io.to('admin_dashboard').emit('supportRoomsList', rooms);
});

});

// Puerto de escucha (sin cambios)
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});