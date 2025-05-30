const io = require('socket.io-client');
const readline = require('readline');

const socket = io('http://localhost:4000');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let currentRoom = null;
let adminName = 'AdminConsola';

socket.on('connect', () => {
    console.log('Conectado al servidor como administrador');
    // Unirse al dashboard de administradores
    socket.emit('joinAdminDashboard');
    showMenu();
});

// Manejar mensajes de soporte
socket.on('supportMessage', (data) => {
    if (currentRoom && data.sender !== 'admin') {
        console.log(`\n[${currentRoom}] Usuario: ${data.message}`);
    }
});

// Manejar nuevas solicitudes de soporte
socket.on('newSupportRequest', (request) => {
    console.log(`\n[SOPORTE] Nueva solicitud de ${request.userName} (Sala: ${request.roomId})`);
});

// Manejar listado de salas
socket.on('supportRoomsList', (rooms) => {
    if (rooms.length === 0) {
        console.log('\nNo hay salas activas');
    } else {
        console.log('\nSalas de soporte:');
        rooms.forEach((room, index) => {
            console.log(`${index + 1}. ${room.userName} - ${room.status} (${room.roomId})`);
            console.log(`   Creada: ${new Date(room.createdAt).toLocaleTimeString()}`);
        });
    }
    showMenu();
});

function showMenu() {
    console.log('\n=== MENÚ DE ADMINISTRADOR ===');
    console.log('1. Listar salas de soporte');
    console.log('2. Unirse a una sala');
    console.log('3. Enviar mensaje');
    console.log('4. Cerrar sala actual');
    console.log('5. Salir');
    
    rl.question('\nSeleccione una opción: ', (option) => {
        switch(option) {
            case '1':
                listRooms();
                break;
            case '2':
                joinRoom();
                break;
            case '3':
                sendMessage();
                break;
            case '4':
                closeRoom();
                break;
            case '5':
                exit();
                break;
            default:
                console.log('Opción inválida');
                showMenu();
        }
    });
}

function listRooms() {
    socket.emit('listSupportRooms');
}

function joinRoom() {
    rl.question('\nID de la sala a unirse: ', (roomId) => {
        socket.emit('joinSupportRoom', roomId, adminName);
        currentRoom = roomId;
        console.log(`\nUnido a sala: ${roomId}`);
        showMenu();
    });
}

function sendMessage() {
    if (!currentRoom) {
        console.log('\nNo estás en ninguna sala');
        showMenu();
        return;
    }
    
    rl.question('\nMensaje: ', (message) => {
        socket.emit('supportMessage', {
            roomId: currentRoom,
            message: message,
            sender: 'admin'
        });
        console.log(`[Tú]: ${message}`);
        showMenu();
    });
}

function closeRoom() {
    if (!currentRoom) {
        console.log('\nNo estás en ninguna sala');
        showMenu();
        return;
    }
    
    socket.emit('closeSupportRoom', currentRoom);
    console.log(`\nSala ${currentRoom} cerrada`);
    currentRoom = null;
    showMenu();
}

function exit() {
    if (currentRoom) {
        socket.emit('closeSupportRoom', currentRoom);
    }
    socket.disconnect();
    rl.close();
    process.exit();
}