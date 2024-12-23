import React from 'react';

const Footer = ({ setView }) => { // Recibe setView como prop
    return (
        <footer className='footer-styled'>
            <div className="footer-center">
                <button className="btn-participar" onClick={() => setView('form')}>
                    PARTICIPAR
                </button>
                <button className="btn-ver-ganadores" onClick={() => setView('ganadores')}>
                    ver ganadores
                </button>
            </div>
        </footer>
    );
};

export default Footer;
