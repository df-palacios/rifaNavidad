-- Seleccionar la base de datos
USE rifa;

-- Crear la tabla clientes
CREATE TABLE clientes (
    identificacion INT PRIMARY KEY, -- Llave primaria sin autoincremento
    nombreUsuario VARCHAR(255),     -- Campo para el nombre del usuario, tipo string
    usuarioHabilitado BOOLEAN,      -- Campo booleano para indicar si el usuario está habilitado
    haParticipado BOOLEAN           -- Campo booleano para indicar si ha participado
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

-- Insertar 50 clientes con identificaciones del 100 al 150
INSERT INTO clientes (identificacion, nombreUsuario, usuarioHabilitado, haParticipado)
VALUES
(100, 'Juan Pérez', TRUE, FALSE),
(101, 'María Rodríguez', FALSE, FALSE),
(102, 'Carlos López', TRUE, FALSE),
(103, 'Ana Martínez', FALSE, FALSE),
(104, 'Luis Gómez', TRUE, FALSE),
(105, 'Diana Sánchez', FALSE, FALSE),
(106, 'Pedro Ramírez', TRUE, FALSE),
(107, 'Carmen Torres', FALSE, FALSE),
(108, 'José Gutiérrez', TRUE, FALSE),
(109, 'Laura Castro', FALSE, FALSE),
(110, 'Andrés Morales', TRUE, FALSE),
(111, 'Paula Vargas', FALSE, FALSE),
(112, 'Jorge Rojas', TRUE, FALSE),
(113, 'Claudia Fernández', FALSE, FALSE),
(114, 'Ricardo Romero', TRUE, FALSE),
(115, 'Luz Marina Restrepo', FALSE, FALSE),
(116, 'Diego Quintero', TRUE, FALSE),
(117, 'Patricia Mejía', FALSE, FALSE),
(118, 'Esteban Marín', TRUE, FALSE),
(119, 'Sandra Álvarez', FALSE, FALSE),
(120, 'Sebastián Ospina', TRUE, FALSE),
(121, 'Mónica Castaño', FALSE, FALSE),
(122, 'Fernando Arango', TRUE, FALSE),
(123, 'Clara Cárdenas', FALSE, FALSE),
(124, 'Julio Valencia', TRUE, FALSE),
(125, 'Rosa Navarro', FALSE, FALSE),
(126, 'Oscar Restrepo', TRUE, FALSE),
(127, 'Silvia Becerra', FALSE, FALSE),
(128, 'Pablo Ibáñez', TRUE, FALSE),
(129, 'Natalia Bedoya', FALSE, FALSE),
(130, 'Guillermo Londoño', TRUE, FALSE),
(131, 'Teresa Hurtado', FALSE, FALSE),
(132, 'Ramiro Torres', TRUE, FALSE),
(133, 'Alejandra Cardona', FALSE, FALSE),
(134, 'Vicente Salazar', TRUE, FALSE),
(135, 'Margarita Suárez', FALSE, FALSE),
(136, 'Manuel Garzón', TRUE, FALSE),
(137, 'Gloria Muñoz', FALSE, FALSE),
(138, 'Daniel Sierra', TRUE, FALSE),
(139, 'Lucía Piedrahita', FALSE, FALSE),
(140, 'Camilo Ávila', TRUE, FALSE),
(141, 'Verónica Henao', FALSE, FALSE),
(142, 'Santiago Restrepo', TRUE, FALSE),
(143, 'Adriana Valencia', FALSE, FALSE),
(144, 'Rafael Gómez', TRUE, FALSE),
(145, 'Lorena Zapata', FALSE, FALSE),
(146, 'Ángel Ocampo', TRUE, FALSE),
(147, 'Francisca Montoya', FALSE, FALSE),
(148, 'Hernán Posada', TRUE, FALSE),
(149, 'Cecilia Vélez', FALSE, FALSE),
(150, 'Iván Marulanda', TRUE, FALSE);
