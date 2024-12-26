const Footer = ({ setView, currentView, isUserValidated }) => {
    if (isUserValidated) return null; // No mostrar el footer si el usuario está validado

    return (
        <footer className='footer-styled'>
            <div className="footer-center">
                <button 
                    className={currentView === 'form' ? "btn-regresar btn-participar" : "btn-participar"} 
                    onClick={() => setView(currentView === 'form' ? 'slide' : 'form')}
                >
                    {currentView === 'form' ? 'REGRESAR' : 'PARTICIPAR'}
                </button>
                <button 
                    className="btn-ver-ganadores" 
                    onClick={() => setView(currentView === 'ganadores' ? 'slide' : 'ganadores')}
                >
                    {currentView === 'ganadores' ? 'REGRESAR' : 'ver ganadores'}
                </button>
            </div>
        </footer>
    );
};

export default Footer;
