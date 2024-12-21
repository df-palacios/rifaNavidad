import React from 'react';
import LogoNavidad from '../assets/FotosRetocadas/LogoNavidad.png';

const Header = () => {
    return (
        <header className="header-styled">
            <h1 className="header-title">GRAN RIFA NAVIDEÑA</h1>
            <img src={LogoNavidad} alt="Navidad Logo" className="navidad-logo" />
        </header>
    );
};

export default Header;
