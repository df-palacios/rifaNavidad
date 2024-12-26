import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FormValidacion.scss';

const FormValidacion = ({ onPlay }) => {
    const [identificacion, setIdentificacion] = useState(''); // Estado para la identificación ingresada
    const [mensaje, setMensaje] = useState(''); // Estado para mostrar mensajes al usuario
    const [isValidated, setIsValidated] = useState(false); // Estado para saber si se validó exitosamente

    const handleValidarParticipacion = () => {
        // Verificar si la identificación está vacía
        if (!identificacion) {
            setMensaje('Por favor, ingresa una identificación válida.');
            return;
        }

        // Hacer una solicitud GET para obtener los datos del cliente por identificación
        axios
            .get(`http://127.0.0.1:8000/api/clientes/${identificacion}`)
            .then((response) => {
                const cliente = response.data;

                // Verificar si el usuario está habilitado y no ha participado
                if (cliente.usuarioHabilitado && !cliente.haParticipado) {
                    // Hacer una solicitud PUT para actualizar el estado de participación
                    axios
                        .put(`http://127.0.0.1:8000/api/clientes/${identificacion}`, {
                            haParticipado: 1,
                        })
                        .then(() => {
                            setMensaje('¡Participación validada con éxito!');
                            setIsValidated(true); // Activar el estado validado
                        })
                        .catch((error) => {
                            console.error('Error al actualizar la participación:', error);
                            setMensaje('Hubo un error al validar la participación.');
                        });
                } else {
                    // Mostrar un mensaje si el usuario no está habilitado o ya participó
                    if (!cliente.usuarioHabilitado) {
                        setMensaje('El usuario no está habilitado para participar.');
                    } else if (cliente.haParticipado) {
                        setMensaje('El usuario ya ha participado.');
                    }
                }
            })
            .catch((error) => {
                console.error('Error al obtener los datos del cliente:', error);
                setMensaje('No se encontró un usuario con esa identificación.');
            });
    };

    return (
        <div className="form-container">
            {!isValidated ? (
                <>
                    <h2>Validar Participación</h2>
                    <input
                        type="number"
                        placeholder="Ingresa tu identificación"
                        value={identificacion}
                        onChange={(e) => setIdentificacion(e.target.value)} // Actualizar el estado con la identificación ingresada
                    />
                    <button onClick={handleValidarParticipacion}>INGRESAR</button>
                    {mensaje && <p className="mensaje">{mensaje}</p>} {/* Mostrar mensajes al usuario */}
                </>
            ) : (
                <>
                    <h2>{mensaje}</h2>
                    <button className="btn-jugar" onClick={onPlay}>
                        JUGAR
                    </button>
                </>
            )}
        </div>
    );
};

export default FormValidacion;
