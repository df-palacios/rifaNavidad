import React from 'react';
import HeaderImage from '../assets/FotosRetocadas/headerImage.png';

const Header = () => {
    return (
        <header className="header-styled">
            <img src={HeaderImage} alt="Header" className="header-image" />
        </header>
    );
};

export default Header;
