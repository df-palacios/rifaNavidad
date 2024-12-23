import React from 'react';
import Slide from '../components/Slide';
import backgroundImage from '../assets/FotosRetocadas/background2.jpg'; // Adjust the path to your image

const Home = () => {
    const homeStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    };

    return (
        <div className='home-styled' style={homeStyle}>
            <div className='title'>
               
                
            </div>
            <Slide />
        </div>
    );
};

export default Home;
