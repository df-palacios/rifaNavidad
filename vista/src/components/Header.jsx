import React from 'react';
import HeaderImage from '../assets/FotosRetocadas/headerImage.png';

/**
 * Renders the header component for the application.
 * The header includes an image with the class "header-image".
 * The header is wrapped in a "header-styled" class.
 */
const Header = () => {
    return (
        <header className="header-styled">
            <img src={HeaderImage} alt="Header" className="header-image" />
        </header>
    );
};

export default Header;
