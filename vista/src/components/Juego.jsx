import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wheel } from 'react-custom-roulette'; // Librería para rueda de la fortuna
import '../styles/Juego.scss';

const Juego = ({ onFinish }) => {
  const [premios, setPremios] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(null);

  useEffect(() => {
    // Cargar premios desde la API
    axios
      .get('http://127.0.0.1:8000/api/premios')
      .then((response) => {
        const premiosAPI = response.data.map((premio) => ({
          option: premio.nombrePremio,
        }));
        // Agregar el décimo elemento "PERDISTE"
        setPremios([...premiosAPI, { option: 'PERDISTE' }]);
      })
      .catch((error) => console.error('Error al cargar los premios:', error));
  }, []);

  const handleSpinClick = () => {
    const index = Math.floor(Math.random() * premios.length);
    setPrizeIndex(index);
    setMustSpin(true);
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    if (onFinish) {
      onFinish(prizeIndex); // Notificar al padre (opcional)
    }
  };

  return (
    <div className="juego-container">
      <h2 className="contrasted-text">¡Gira la rueda de la fortuna!</h2>
      {premios.length > 0 && (
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeIndex}
          data={premios}
          onStopSpinning={handleSpinEnd}
          backgroundColors={['#FFDD00', '#FF5722', '#4CAF50', '#03A9F4', '#FFC107', '#9C27B0', '#E91E63', '#607D8B']}
          textColors={['#000', '#fff']}
          fontSize={14} // Texto más pequeño
        />
      )}
      <button onClick={handleSpinClick} className="btn-spin">
        GIRAR
      </button>
    </div>
  );
};

export default Juego;
