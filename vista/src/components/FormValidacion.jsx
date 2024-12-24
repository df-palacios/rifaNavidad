import React, { useState } from 'react';
import axios from 'axios';
import Juego from './Juego'; // Importamos el nuevo componente
import '../styles/FormValidacion.scss';

const FormValidacion = () => {
    const [identificacion, setIdentificacion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [isValidated, setIsValidated] = useState(false); // Nuevo estado para controlar la validación

    const handleValidarParticipacion = () => {
        if (!identificacion) {
            setMensaje('Por favor, ingresa una identificación válida.');
            return;
        }

        axios
            .get(`http://127.0.0.1:8000/api/clientes/${identificacion}`)
            .then((response) => {
                const cliente = response.data;

                if (cliente.usuarioHabilitado && !cliente.haParticipado) {
                    axios
                        .put(`http://127.0.0.1:8000/api/clientes/${identificacion}`, {
                            haParticipado: 1,
                        })
                        .then(() => {
                            setMensaje('¡Participación validada con éxito!');
                            setIsValidated(true); // Cambiar a la vista de Juego
                        })
                        .catch((error) => {
                            console.error('Error al actualizar la participación:', error);
                            setMensaje('Hubo un error al validar la participación.');
                        });
                } else {
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

    return isValidated ? (
        <Juego /> // Renderizar el componente Juego si se valida correctamente
    ) : (
        <div className="form-container">
            <h2>Validar Participación</h2>
            <input
                type="number"
                placeholder="Ingresa tu identificación"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
            />
            <button onClick={handleValidarParticipacion}>INGRESAR</button>
            {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
    );
};

export default FormValidacion;
