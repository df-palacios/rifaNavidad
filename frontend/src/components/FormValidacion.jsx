import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, describeApiError } from '../config/api';
import { click, navigate, success, error as errorSound } from '../lib/audio';

const FormValidacion = ({ onPlay, setUserValidated, setUserId }) => {
    const [identificacion, setIdentificacion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [isValidated, setIsValidated] = useState(false);
    const [premiosDisponibles, setPremiosDisponibles] = useState(false);

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/api/premios`)
            .then((response) => {
                const disponibles = response.data.some((premio) => premio.disponible === 1);
                setPremiosDisponibles(disponibles);
                if (!disponibles) {
                    errorSound();
            setMensaje('No hay premios disponibles en este momento.');
                }
            })
            .catch((error) => {
                console.error('Error al verificar los premios:', error);
                setMensaje(describeApiError(error, 'Error al verificar los premios disponibles.'));
            });
    }, []);

    const handleValidarParticipacion = () => {
        if (!identificacion) {
            errorSound();
            setMensaje('Por favor, ingresa una identificación válida.');
            return;
        }

        if (!premiosDisponibles) {
            errorSound();
            setMensaje('No hay premios disponibles en este momento.');
            return;
        }

        axios
            .get(`${API_BASE_URL}/api/clientes/${identificacion}`)
            .then((response) => {
                const cliente = response.data;

                if (cliente.usuarioHabilitado && !cliente.haParticipado) {
                    axios
                        .put(`${API_BASE_URL}/api/clientes/${identificacion}`, {
                            haParticipado: 1,
                        })
                        .then(() => {
                            success();
                            setMensaje('¡Participación validada con éxito!');
                            setIsValidated(true);
                            setUserValidated(true);
                            setUserId(identificacion); // Establecer el ID del usuario
                        })
                        .catch((error) => {
                            console.error('Error al actualizar la participación:', error);
                            errorSound();
            setMensaje('Hubo un error al validar la participación.');
                        });
                } else {
                    if (!cliente.usuarioHabilitado) {
                        errorSound();
            setMensaje('El usuario no está habilitado para participar.');
                    } else if (cliente.haParticipado) {
                        errorSound();
            setMensaje('El usuario ya ha participado.');
                    }
                }
            })
            .catch((error) => {
                console.error('Error al obtener los datos del cliente:', error);
                setMensaje('No se encontró un usuario con esa identificación o no está habilitado para participar por falta de pago.');
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
                    <medium style={{display:'block', margin:'8px 0 12px', color:'#555', fontWeight:'600', textAlign:'center'}}>
                        Ingrese un número entre 1 y 99 para probar la aplicación, sólo los usuarios impares pueden participar.
                    </medium>
                    <button
                        onClick={() => {
                            click();
                            handleValidarParticipacion();
                        }}
                        disabled={!premiosDisponibles}
                    >
                        INGRESAR
                    </button>
                    {mensaje && <p className="mensaje">{mensaje}</p>}
                </>
            ) : (
                <>
                    <h2>{mensaje}</h2>
                    <button
                        className="btn-jugar"
                        onClick={() => {
                            navigate();
                            onPlay();
                        }}
                    >
                        JUGAR
                    </button>
                </>
            )}
        </div>
    );
};

export default FormValidacion;
