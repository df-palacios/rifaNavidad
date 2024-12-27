import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FormValidacion.scss';

const FormValidacion = ({ onPlay, setUserValidated, setUserId }) => {
    const [identificacion, setIdentificacion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [isValidated, setIsValidated] = useState(false);
    const [premiosDisponibles, setPremiosDisponibles] = useState(false);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/premios`)
            .then((response) => {
                const disponibles = response.data.some((premio) => premio.disponible === 1);
                setPremiosDisponibles(disponibles);
                if (!disponibles) {
                    setMensaje('No hay premios disponibles en este momento.');
                }
            })
            .catch((error) => {
                console.error('Error al verificar los premios:', error);
                setMensaje('Error al verificar los premios disponibles.');
            });
    }, []);

    const handleValidarParticipacion = () => {
        if (!identificacion) {
            setMensaje('Por favor, ingresa una identificación válida.');
            return;
        }

        if (!premiosDisponibles) {
            setMensaje('No hay premios disponibles en este momento.');
            return;
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/api/clientes/${identificacion}`)
            .then((response) => {
                const cliente = response.data;

                if (cliente.usuarioHabilitado && !cliente.haParticipado) {
                    axios
                        .put(`${process.env.REACT_APP_API_URL}/api/clientes/${identificacion}`, {
                            haParticipado: 1,
                        })
                        .then(() => {
                            setMensaje('¡Participación validada con éxito!');
                            setIsValidated(true);
                            setUserValidated(true);
                            setUserId(identificacion); // Establecer el ID del usuario
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

    return (
        <div className="form-container">
            {!isValidated ? (
                <>
                    <h2>Validar Participación</h2>
                    <input
                        type="number"
                        placeholder="Ingresa tu identificación"
                        value={identificacion}
                        onChange={(e) => setIdentificacion(e.target.value)}
                        disabled={!premiosDisponibles}
                    />
                    <button
                        onClick={handleValidarParticipacion}
                        disabled={!premiosDisponibles}
                    >
                        INGRESAR
                    </button>
                    {mensaje && <p className="mensaje">{mensaje}</p>}
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
