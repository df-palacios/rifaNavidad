-- Seleccionar la base de datos
USE rifa;

-- Crear la tabla clientes
CREATE TABLE clientes (
    identificacion INT PRIMARY KEY, -- Llave primaria sin autoincremento
    nombreUsuario VARCHAR(255),     -- Campo para el nombre del usuario, tipo string
    usuarioHabilitado BOOLEAN,     -- Campo booleano para indicar si el usuario está habilitado
    haParticipado BOOLEAN          -- Campo booleano para indicar si ha participado
);

-- Crear la tabla premios
CREATE TABLE premios (
    idPremio INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria con autoincremento
    nombrePremio VARCHAR(255),              -- Campo para el nombre del premio, tipo string
    idGanador INT,                          -- Llave foránea que corresponde a clientes.identificacion
    disponible BOOLEAN,                     -- Campo booleano para indicar si el premio está disponible
    CONSTRAINT fk_idGanador FOREIGN KEY (idGanador) REFERENCES clientes(identificacion)
);

-- Insertar premios en la tabla premios
INSERT INTO premios (idPremio, nombrePremio, disponible)
VALUES 
(1, 'olla arrocera', TRUE),
(2, 'parlante', TRUE),
(3, 'ventilador 3 en 1', TRUE),
(4, 'olla a presion', TRUE),
(5, 'horno microondas', TRUE),
(6, 'licuadora', TRUE),
(7, 'air fryer', TRUE),
(8, 'cafetera', TRUE),
(9, 'juego de ollas', TRUE);
