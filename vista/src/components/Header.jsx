import React from 'react';
import axios from 'axios';
import HeaderImage from '../assets/FotosRetocadas/headerImage.png';
import '../styles/Header.scss';

const Header = () => {

    const resetDatabase = async () => {
        try {
            await axios.post('http://localhost:8000/api/reset-db');
            alert("Base de datos reiniciada correctamente.");
        } catch (e) {
            alert("Error al reiniciar la base de datos.");
        }
    };

    return (
        <header className="header-styled">

            <div className="header-buttons">

                <button
                    className="btn-portfolio"
                    onClick={() => window.location.href = "https://dfpalacios.cloud"}
                >
                    ← Volver al Portafolio
                </button>

                <button
                    className="btn-testing-reset"
                    onClick={resetDatabase}
                >
                    [TESTING] Reiniciar BD
                </button>

            </div>

            <img
                src={HeaderImage}
                alt="Header"
                className="header-image"
            />

        </header>
    );
};

export default Header;