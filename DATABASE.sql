CREATE DATABASE db_Juego;
USE db_Juego;

CREATE TABLE tb_Jugadores (
    ID_Jugador INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Nickname VARCHAR(50) NOT NULL UNIQUE,
    Correo VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    Fecha_cambio DATETIME NULL,
    Estado BOOLEAN DEFAULT TRUE,
    Rol VARCHAR(20) NOT NULL DEFAULT 'jugador',
    INDEX idx_nickname (Nickname),
    INDEX idx_correo (Correo)
);

CREATE TABLE tb_Juegos (
    ID_Juego INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL UNIQUE,
    Descripcion TEXT,
    Precio DECIMAL(10,2) DEFAULT 0.00,
    INDEX idx_nombre (Nombre)
);

CREATE TABLE tb_Puntajes (
    ID_Puntaje INT PRIMARY KEY AUTO_INCREMENT,
    ID_Juego INT NOT NULL,
    ID_Jugador INT NOT NULL,
    Puntaje INT NOT NULL DEFAULT 0,
    Fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Juego) REFERENCES tb_Juegos(ID_Juego) ON DELETE CASCADE,
    FOREIGN KEY (ID_Jugador) REFERENCES tb_Jugadores(ID_Jugador) ON DELETE CASCADE,
    UNIQUE KEY uk_juego_jugador (ID_Juego, ID_Jugador), -- Evita duplicados
    INDEX idx_puntaje (Puntaje DESC) -- Para ranking
);

CREATE TABLE tb_Juegos_Jugadores (
    ID_Juego_jugador INT PRIMARY KEY AUTO_INCREMENT,
    ID_Juego INT NOT NULL,
    ID_Jugador INT NOT NULL,
    Fecha_adquisicion DATETIME DEFAULT CURRENT_TIMESTAMP,
    EsCompra BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ID_Juego) REFERENCES tb_Juegos(ID_Juego) ON DELETE CASCADE,
    FOREIGN KEY (ID_Jugador) REFERENCES tb_Jugadores(ID_Jugador) ON DELETE CASCADE,
    UNIQUE KEY uk_juego_jugador (ID_Juego, ID_Jugador) -- Evita duplicados
);
