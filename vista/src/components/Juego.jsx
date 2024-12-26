import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette'; // Librería para rueda de la fortuna
import '../styles/Juego.scss';

const Juego = ({ onFinish }) => {
  const premios = [
    { option: '😃' }, // GANASTE
    { option: '😓' }, // PERDISTE
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(null);
  const [result, setResult] = useState(null); // Estado para mostrar GANASTE o PERDISTE

  const handleSpinClick = () => {
    if (mustSpin) return; // Evitar que se pueda girar mientras está girando

    const index = Math.floor(Math.random() * premios.length); // Elegir aleatoriamente una opción
    setPrizeIndex(index);
    setMustSpin(true);
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    const selectedPrize = premios[prizeIndex]?.option;

    // Determinar el resultado basado en el emoji
    if (selectedPrize === '😃') {
      setResult('GANASTE');
    } else if (selectedPrize === '😓') {
      setResult('PERDISTE');
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
        backgroundColors={['#50C878', '#6d0606']} // Colores para "GANASTE" y "PERDISTE"
        textColors={['#fff']}
        fontSize={96} // Ajustar el tamaño del texto
      />
      {!mustSpin && result ? (
        <button onClick={onFinish} className="btn-return">
          REGRESAR
        </button>
      ) : (
        <button onClick={handleSpinClick} className="btn-spin" disabled={mustSpin}>
          GIRAR
        </button>
      )}
    </div>
  );
};

export default Juego;
