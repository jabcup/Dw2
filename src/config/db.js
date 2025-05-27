const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'jh',
    password: 'qwerty',
    database: 'db_Juego'
});

connection.connect((err) => {
    if (err){
        console.error('Error al conectar a la base de datos:', err);
    }else {
        console.log('Conexion a la base de datos exitosa bb')
    }
});

module.exports = connection;
