import React from 'react';
import axios from 'axios';
import HeaderImage from '../assets/FotosRetocadas/headerImageTrimmed.png';
import { API_BASE_URL, describeApiError } from '../config/api';

const Header = () => {

    const resetDatabase = async () => {
        try {
<<<<<<< Updated upstream
            await axios.post('http://localhost:8000/api/reset-db');
=======
            await axios.post(`${API_BASE_URL}/api/reset-db`);
>>>>>>> Stashed changes
            alert("Base de datos reiniciada correctamente.");
        } catch (e) {
            alert(describeApiError(e, 'Error al reiniciar la base de datos.'));
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
                alt="Gran Rifa Navideña"
                className="header-image"
            />

        </header>
    );
};

export default Header;