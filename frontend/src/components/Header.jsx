import React from 'react';
import axios from 'axios';
import HeaderImage from '../assets/FotosRetocadas/headerImageTrimmed.png';
import { API_BASE_URL, describeApiError } from '../config/api';
import { click, success, error as errorSound } from '../lib/audio';
import { PORTFOLIO_URL } from '../config/links';

const Header = () => {

    const resetDatabase = async () => {
        try {
            await axios.post(`${API_BASE_URL}/api/reset-db`);
            success();
            alert("Aplicación reiniciada correctamente.");
        } catch (e) {
            errorSound();
            alert(describeApiError(e, 'Error al reiniciar la aplicación.'));
        }
    };

    return (
        <header className="header-styled">

            <div className="header-buttons">

                <button
                    className="btn-portfolio"
                    onClick={() => {
                        click();
                        window.location.href = PORTFOLIO_URL;
                    }}
                >
                    ← Volver al Portafolio
                </button>

                <button
                    className="btn-testing-reset"
                    onClick={() => {
                        click();
                        resetDatabase();
                    }}
                >
                    [TESTING] Reiniciar aplicación
                </button>

            </div>

            <img
                src={HeaderImage}
                alt="Gran Rifa Navideña"
                className="header-image"
            />

        </header>
    );
};

export default Header;