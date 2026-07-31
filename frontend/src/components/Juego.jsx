import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Wheel } from 'react-custom-roulette';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { navigate, jackpot, lose, pop, error as errorSound } from '../lib/audio';
import { startWheelRatchet } from '../lib/wheelRatchet';
import wheelPointer from '../assets/wheelPointer.svg';

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

// La rueda alterna gajos ganadores y perdedores para parecerse a una rueda
// de la fortuna real, en lugar de dos medios circulos.
const SLICE_COUNT = 8;

const premios = Array.from({ length: SLICE_COUNT }, (_, i) => ({
    option: i % 2 === 0 ? '😃' : '😓',
}));

// Gajos pares = con premio, impares = sin premio.
const WINNING_SLICES = premios.map((_, i) => i).filter((i) => i % 2 === 0);
const LOSING_SLICES = premios.map((_, i) => i).filter((i) => i % 2 !== 0);

const Juego = ({ onFinish, userId }) => {

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeIndex, setPrizeIndex] = useState(null);
    const [result, setResult] = useState(null);
    const [showFireworks, setShowFireworks] = useState(false);
    const [fireworksWave, setFireworksWave] = useState(0);

    // Referencias para poder cortar sonidos/temporizadores si el componente
    // se desmonta a mitad de un giro o de la celebracion.
    const wheelBoxRef = useRef(null);
    const stopTicksRef = useRef(null);
    const celebrationTimersRef = useRef([]);
    const waveIntervalRef = useRef(null);

    // Corta TODO lo que suena o esta agendado: el trinquete de la ruleta,
    // los temporizadores de la celebracion y el intervalo de los estallidos.
    //
    // El intervalo necesita su propia referencia: antes solo lo cancelaba un
    // setTimeout que a su vez se limpiaba al desmontar, asi que si salias
    // antes de que terminara la celebracion el intervalo quedaba huerfano
    // reproduciendo "pop" indefinidamente.
    const stopAllSounds = useCallback(() => {
        if (stopTicksRef.current) {
            stopTicksRef.current();
            stopTicksRef.current = null;
        }

        if (waveIntervalRef.current) {
            clearInterval(waveIntervalRef.current);
            waveIntervalRef.current = null;
        }

        celebrationTimersRef.current.forEach(clearTimeout);
        celebrationTimersRef.current = [];
    }, []);

    useEffect(() => stopAllSounds, [stopAllSounds]);

    const celebrateWin = () => {
        setShowFireworks(true);
        setFireworksWave((w) => w + 1);

        // Fanfarria de casino al ganar.
        jackpot();

        // El primer estallido acompana la primera oleada de chispas.
        const firstPop = setTimeout(() => pop(), 120);
        celebrationTimersRef.current.push(firstPop);

        // Varias oleadas de chispas espaciadas, para que la celebración dure
        // un rato sin dejar un solo destello que se apague enseguida.
        // Cada oleada lleva su propio "pop" para que suene y se vea a la vez.
        waveIntervalRef.current = setInterval(() => {
            setFireworksWave((w) => w + 1);
            pop();
        }, 1000);

        const endTimer = setTimeout(() => {
            if (waveIntervalRef.current) {
                clearInterval(waveIntervalRef.current);
                waveIntervalRef.current = null;
            }
            setShowFireworks(false);
        }, 3800);
        celebrationTimersRef.current.push(endTimer);
    };

    const handleSpinClick = () => {
        if (!mustSpin) {
            // 40% de probabilidad de ganar, 60% de perder. Dentro del grupo
            // que toque se elige un gajo al azar, asi la rueda no cae
            // siempre en el mismo punto y el giro se ve creible.
            const pool = Math.random() < 0.4 ? WINNING_SLICES : LOSING_SLICES;
            const index = pool[Math.floor(Math.random() * pool.length)];
            setPrizeIndex(index);
            setMustSpin(true);

            // Trinquete sincronizado con la rotacion real de la rueda.
            navigate();
            if (stopTicksRef.current) stopTicksRef.current();
            stopTicksRef.current = startWheelRatchet(wheelBoxRef.current);
        }
    };

    const handleSpinEnd = () => {
        setMustSpin(false);

        // La ruleta se detuvo: cortamos el trinquete.
        if (stopTicksRef.current) {
            stopTicksRef.current();
            stopTicksRef.current = null;
        }

        const resultMessage = premios[prizeIndex].option === '😃' ? 'GANASTE' : 'PERDISTE';
        setResult(resultMessage);

        if (resultMessage === 'GANASTE') {
            // La fanfarria suena en celebrateWin, cuando el premio ya se asigno.
            asignarPremio();
        } else {
            lose();
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
                lose();
                setResult('No hay premios disponibles en este momento.');
            }
        } catch (error) {
            console.error('Error al asignar el premio:', error);
            errorSound();
            setResult('Hubo un error al asignar el premio. Intenta nuevamente.');
        }
    };

    return (
        <div className="juego-container">
            {showFireworks && <FireworksOverlay wave={fireworksWave} />}
            <h2 className="contrasted-text">{result || '¡Gira la rueda de la fortuna!'}</h2>
            <div className="wheel-wrapper" ref={wheelBoxRef}>
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeIndex ?? 0}
                    data={premios}
                    onStopSpinning={handleSpinEnd}
                    /* Verde = con premio, crema = sin premio; alternados */
                    backgroundColors={['#15803d', '#fdf6e3']}
                    textColors={['#ffffff', '#7c2d12']}
                    fontSize={52}
                    textDistance={62}
                    outerBorderColor="#d4af37"
                    outerBorderWidth={14}
                    innerRadius={9}
                    innerBorderColor="#d4af37"
                    innerBorderWidth={10}
                    radiusLineColor="#d4af37"
                    radiusLineWidth={2}
                    pointerProps={{ src: wheelPointer }}
                />
            </div>
            {result ? (
                <button
                    onClick={() => {
                        stopAllSounds();
                        navigate();
                        onFinish();
                    }}
                    className="btn-spin"
                >
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
