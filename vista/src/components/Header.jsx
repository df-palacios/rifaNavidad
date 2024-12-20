import React from 'react';
import LogoNavidad from '../assets/FotosRetocadas/LogoNavidad.png';

const Header = () => {
    return (
        <header className="header-styled">
            <img src={LogoNavidad} alt="Navidad Logo" className="navidad-logo" />
        </header>
    );
};

export default Header;
