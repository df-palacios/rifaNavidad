import React from 'react';
import '../styles/FormValidacion.scss';


const FormValidacion = () => {
    return (
        <div className="form-container">
            <h2>Validar Participación</h2>
            <input
                type="number"
                placeholder="Ingresa tu identificación"
            />
            <button>INGRESAR</button>
        </div>
    );
};

export default FormValidacion;
