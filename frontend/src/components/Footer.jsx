import React from 'react';
import { toggle } from '../lib/audio';

const Footer = ({ setView, currentView, isUserValidated }) => {
    // Ocultar el footer cuando:
    // 1. El usuario está validado y estamos en la vista "form" (botón JUGAR).
    // 2. Estamos en la vista "juego" (girando la ruleta).
    if ((isUserValidated && currentView === 'form') || currentView === 'juego') return null;

    // Mismo click-clack suave del selector de idioma del portafolio.
    const go = (view) => {
        toggle();
        setView(view);
    };

    return (
        <footer className="footer-styled">
            <div className="footer-center">
                <button
                    className={currentView === 'form' ? 'btn-regresar btn-participar' : 'btn-participar'}
                    onClick={() => go(currentView === 'form' ? 'slide' : 'form')}
                >
                    {currentView === 'form' ? 'REGRESAR' : 'PARTICIPAR'}
                </button>
                <button
                    className="btn-ver-ganadores"
                    onClick={() => go(currentView === 'ganadores' ? 'slide' : 'ganadores')}
                >
                    {currentView === 'ganadores' ? 'REGRESAR' : 'VER GANADORES'}
                </button>
            </div>
        </footer>
    );
};

export default Footer;
