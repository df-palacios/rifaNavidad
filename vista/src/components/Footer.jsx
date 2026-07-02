import React from 'react';
import axios from 'axios';
import '../styles/Footer.scss';

const Footer = ({ setView, currentView, isUserValidated }) => {
    // Ocultar el footer cuando:
    // 1. El usuario está validado y estamos en la vista "form" (botón JUGAR).
    // 2. Estamos en la vista "juego" (girando la ruleta).
    if ((isUserValidated && currentView === 'form') || currentView === 'juego') return null;

    return (
        <footer className="footer-styled">
            <div className="footer-center">
                <button
                    className={currentView === 'form' ? 'btn-regresar btn-participar' : 'btn-participar'}
                    onClick={() => setView(currentView === 'form' ? 'slide' : 'form')}
                >
                    {currentView === 'form' ? 'REGRESAR' : 'PARTICIPAR'}
                </button>
                <button
                    className="btn-ver-ganadores"
                    onClick={() => setView(currentView === 'ganadores' ? 'slide' : 'ganadores')}
                >
                    {currentView === 'ganadores' ? 'REGRESAR' : 'VER GANADORES'}
                </button>
                <button
                    className="btn-testing-reset"
                    onClick={async ()=>{try{await axios.post('http://localhost:8000/api/reset-db');;alert("Base de datos reiniciada correctamente.");}catch(e){alert("Error al reiniciar la base de datos.");}}}
                >
                    [TESTING] Reiniciar base de datos
                </button>
            </div>
        </footer>
    );
};

export default Footer;
