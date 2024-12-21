-- Seleccionar la base de datos
USE rifa;

-- Crear la tabla clientes
CREATE TABLE clientes (
    identificacion INT PRIMARY KEY, -- Llave primaria sin autoincremento
    nombrePremio VARCHAR(255),     -- Campo para el nombre del premio, tipo string
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

