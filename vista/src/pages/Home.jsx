import React, { useState } from 'react';
import Header from '../components/Header'; // Importa el Header
import Slide from '../components/Slide';
import FormValidacion from '../components/FormValidacion';
import ListaGanadores from '../components/ListaGanadores';
import Footer from '../components/Footer';
import backgroundImage from '../assets/FotosRetocadas/background2.jpg';

const Home = () => {
    const [view, setView] = useState('slide'); // Estado para alternar vistas

    const homeStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    };

    return (
        <>
            <Header /> {/* Agrega el Header aquí */}
            <div className='home-styled' style={homeStyle}>
                {view === 'slide' && <Slide />}
                {view === 'form' && <FormValidacion />}
                {view === 'ganadores' && <ListaGanadores />}
                <Footer setView={setView} />
            </div>
        </>
    );
};

export default Home;
