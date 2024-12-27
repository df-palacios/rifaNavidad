import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import axios from 'axios';
import '../styles/Juego.scss';

const Juego = ({ onFinish, userId }) => {
    const premios = [
        { option: '😃' },
        { option: '😓' },
    ];

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeIndex, setPrizeIndex] = useState(null);
    const [result, setResult] = useState(null);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const index = Math.floor(Math.random() * premios.length);
            setPrizeIndex(index);
            setMustSpin(true);
        }
    };

    const handleSpinEnd = () => {
        setMustSpin(false);
        const resultMessage = premios[prizeIndex].option === '😃' ? 'GANASTE' : 'PERDISTE';
        setResult(resultMessage);

        if (resultMessage === 'GANASTE') {
            asignarPremio();
        }
    };

    const asignarPremio = async () => {
        try {
            // Obtener el primer premio disponible
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/premios`);
            const premioDisponible = response.data.find((premio) => premio.disponible === 1);

            if (premioDisponible) {
                // Actualizar el premio con el ID del ganador
                await axios.put(`${process.env.REACT_APP_API_URL}/api/premios/${premioDisponible.idPremio}`, {
                    disponible: false,
                    idGanador: userId, // ID del usuario ganador
                });

                alert(`¡Felicidades! Ganaste el premio: ${premioDisponible.nombrePremio}`);
            } else {
                alert('No hay premios disponibles en este momento.');
            }
        } catch (error) {
            console.error('Error al asignar el premio:', error);
            alert('Hubo un error al asignar el premio. Intenta nuevamente.');
        }
    };

    return (
        <div className="juego-container">
            <h2 className="contrasted-text">{result || '¡Gira la rueda de la fortuna!'}</h2>
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeIndex}
                data={premios}
                onStopSpinning={handleSpinEnd}
                backgroundColors={['#50C878', '#6d0606']}
                textColors={['#fff']}
                fontSize={96}
            />
            {result ? (
                <button onClick={onFinish} className="btn-spin">
                    REGRESAR
                </button>
            ) : (
                <button
                    onClick={handleSpinClick}
                    className="btn-spin"
                    disabled={mustSpin}
                >
                    {mustSpin ? 'GIRANDO...' : 'GIRAR'}
                </button>
            )}
        </div>
    );
};

export default Juego;
