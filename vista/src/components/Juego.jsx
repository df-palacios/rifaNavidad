import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import '../styles/Juego.scss';

const Juego = ({ onFinish }) => {
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
