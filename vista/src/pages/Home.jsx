import React, { useState } from 'react';
import Header from '../components/Header'; 
import Slide from '../components/Slide';
import FormValidacion from '../components/FormValidacion';
import ListaGanadores from '../components/ListaGanadores';
import Footer from '../components/Footer';
import backgroundImage from '../assets/FotosRetocadas/background2.jpg';

const Home = () => {
    const [view, setView] = useState('slide'); 
    const [isUserValidated, setIsUserValidated] = useState(false); // Estado para el usuario validado

    const homeStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    };

    return (
        <>
            <Header /> 
            <div className='home-styled' style={homeStyle}>
                {view === 'slide' && <Slide />}
                {view === 'form' && (
                    <FormValidacion onPlay={() => setView('slide')} setUserValidated={setIsUserValidated} />
                )}
                {view === 'ganadores' && <ListaGanadores />}
                <Footer setView={setView} currentView={view} isUserValidated={isUserValidated} />
            </div>
        </>
    );
};

export default Home;
