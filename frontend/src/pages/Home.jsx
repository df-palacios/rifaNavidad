import React, { useState } from 'react';
import Header from '../components/Header';
import Slide from '../components/Slide';
import FormValidacion from '../components/FormValidacion';
import ListaGanadores from '../components/ListaGanadores';
import Footer from '../components/Footer';
import Juego from '../components/Juego';
import backgroundImage from '../assets/FotosRetocadas/background2.jpg';

const Home = () => {
    const [view, setView] = useState('slide');
    const [isUserValidated, setIsUserValidated] = useState(false);
    const [userId, setUserId] = useState(null); // Estado para guardar el ID del usuario

    const homeStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
    };

    const resetUserValidation = () => {
        setIsUserValidated(false);
    };

    return (
        <div className="app-shell">
            <Header />
            <div className="home-styled" style={homeStyle}>
                <div className="view-wrapper">
                    {view === 'slide' && <Slide />}
                    {view === 'form' && (
                        <FormValidacion
                            onPlay={() => setView('juego')}
                            setUserValidated={setIsUserValidated}
                            setUserId={setUserId} // Pasar setUserId al formulario
                        />
                    )}
                    {view === 'ganadores' && <ListaGanadores />}
                    {view === 'juego' && (
                        <Juego
                            onFinish={() => {
                                setView('slide');
                                resetUserValidation();
                            }}
                            userId={userId} // Pasar el userId al componente Juego
                        />
                    )}
                </div>
                <Footer
                    setView={setView}
                    currentView={view}
                    isUserValidated={isUserValidated}
                />
            </div>
        </div>
    );
};

export default Home;
