import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Genera N chispas con ángulo/distancia/color/retraso aleatorios para que
// cada explosión de fuegos artificiales se vea distinta y orgánica.
const SPARK_COLORS = ['#FFD700', '#FF6B6B', '#4FD1C5', '#F6AD55', '#63B3ED', '#F687B3'];

const createBurst = (originX, originY, count = 10) =>
    Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const distance = 55 + Math.random() * 35;
        return {
            id: `${originX}-${originY}-${i}`,
            originX,
            originY,
            tx: Math.cos(angle) * distance,
            ty: Math.sin(angle) * distance,
            color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
            delay: Math.random() * 0.15,
        };
    });

const FireworksOverlay = ({ wave }) => {
    // Tres explosiones en distintos puntos, imitando chispas en el cielo.
    // Cada oleada usa posiciones ligeramente distintas para que no se vea repetitivo.
    const jitter = () => Math.random() * 14 - 7;
    const bursts = [
        ...createBurst(22 + jitter(), 22 + jitter()),
        ...createBurst(50 + jitter(), 14 + jitter()),
        ...createBurst(78 + jitter(), 25 + jitter()),
    ];

    return (
        <div className="fireworks-overlay" aria-hidden="true">
            {bursts.map((spark) => (
                <span
                    key={`${wave}-${spark.id}`}
                    className="firework-spark"
                    style={{
                        left: `${spark.originX}%`,
                        top: `${spark.originY}%`,
                        '--tx': `${spark.tx}px`,
                        '--ty': `${spark.ty}px`,
                        '--spark-color': spark.color,
                        animationDelay: `${spark.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

const Juego = ({ onFinish, userId }) => {
    const premios = [
        { option: '😃' }, // Ganador
        { option: '😓' }, // Perdedor
    ];

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeIndex, setPrizeIndex] = useState(null);
    const [result, setResult] = useState(null);
    const [showFireworks, setShowFireworks] = useState(false);
    const [fireworksWave, setFireworksWave] = useState(0);

    const celebrateWin = () => {
        setShowFireworks(true);
        setFireworksWave((w) => w + 1);

        // Varias oleadas de chispas espaciadas, para que la celebración dure
        // un rato sin dejar un solo destello que se apague enseguida.
        const waveTimer = setInterval(() => {
            setFireworksWave((w) => w + 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(waveTimer);
            setShowFireworks(false);
        }, 3800);
    };

    const handleSpinClick = () => {
        if (!mustSpin) {
            // Lógica para 1/2 probabilidad de ganar
            const randomNumber = Math.floor(Math.random() * 2); // Generar un número entre 0 y 1
            const index = randomNumber === 0 ? 0 : 1; // Si es 0, gana; de lo contrario, pierde
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
            const response = await axios.get(`${API_BASE_URL}/api/premios`);
            const premioDisponible = response.data.find((premio) => premio.disponible === 1);

            if (premioDisponible) {
                // Actualizar el premio con el ID del ganador
                await axios.put(`${API_BASE_URL}/api/premios/${premioDisponible.idPremio}`, {
                    disponible: false,
                    idGanador: userId, // ID del usuario ganador
                });

                setResult(`¡Felicitaciones! Ganaste: ${premioDisponible.nombrePremio}`);
                celebrateWin();
            } else {
                setResult('No hay premios disponibles en este momento.');
            }
        } catch (error) {
            console.error('Error al asignar el premio:', error);
            setResult('Hubo un error al asignar el premio. Intenta nuevamente.');
        }
    };

    return (
        <div className="juego-container">
            {showFireworks && <FireworksOverlay wave={fireworksWave} />}
            <h2 className="contrasted-text">{result || '¡Gira la rueda de la fortuna!'}</h2>
            <div className="wheel-wrapper">
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeIndex}
                    data={premios}
                    onStopSpinning={handleSpinEnd}
                    backgroundColors={['#50C878', '#6d0606']}
                    textColors={['#fff']}
                    fontSize={96}
                />
            </div>
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
