import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette'; // Librería para rueda de la fortuna
import '../styles/Juego.scss';

const Juego = ({ onFinish }) => {
  const premios = [
    { option: '😃' },
    { option: '😓' },
  ]; // Opciones fijas para la ruleta

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(null);

  const handleSpinClick = () => {
    const index = Math.floor(Math.random() * premios.length); // Elegir aleatoriamente una opción
    setPrizeIndex(index);
    setMustSpin(true);
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    if (onFinish) {
      onFinish(prizeIndex); // Notificar al componente padre (opcional)
    }
  };

  return (
    <div className="juego-container">
      <h2 className="contrasted-text">¡Gira la rueda de la fortuna!</h2>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeIndex}
        data={premios}
        onStopSpinning={handleSpinEnd}
        backgroundColors={['#50C878', '#6d0606']} // Colores para "GANASTE" y "PERDISTE"
        textColors={['#fff']}
        fontSize={96} // Ajustar el tamaño del texto
      />
      <button onClick={handleSpinClick} className="btn-spin">
        GIRAR
      </button>
    </div>
  );
};

export default Juego;
