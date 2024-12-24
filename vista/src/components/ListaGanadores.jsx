import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ListaGanadores.scss';

const ListaGanadores = () => {
    // Estado para guardar la lista de premios
    const [premios, setPremios] = useState([]);

    // Estado para guardar los nombres de los ganadores
    const [ganadores, setGanadores] = useState({});

    // useEffect para obtener los premios al montar el componente
    useEffect(() => {
        // Realizar la solicitud GET para obtener los premios
        axios.get('http://127.0.0.1:8000/api/premios')
            .then((response) => {
                setPremios(response.data); // Guardar la lista de premios en el estado
                obtenerNombresGanadores(response.data); // Obtener nombres de los ganadores
            })
            .catch((error) => {
                console.error('Error al obtener los premios:', error);
            });
    }, []);

    // Función para obtener los nombres de los ganadores
    const obtenerNombresGanadores = (premios) => {
        // Iterar sobre los premios para obtener el nombre de cada ganador
        premios.forEach((premio) => {
            if (premio.idGanador) {
                axios.get(`http://127.0.0.1:8000/api/clientes/${premio.idGanador}`)
                    .then((response) => {
                        setGanadores((prevGanadores) => ({
                            ...prevGanadores,
                            [premio.idGanador]: response.data.nombreUsuario
                        }));
                    })
                    .catch((error) => {
                        console.error(`Error al obtener el ganador con ID ${premio.idGanador}:`, error);
                    });
            }
        });
    };

    return (
        <div className="table-container">
            {/* Encabezado separado de la tabla */}
            <div className="table-header">
                <div>Premio</div>
                <div>Ganador</div>
            </div>
            <div className="table-content">
                <table>
                    <tbody>
                        {premios.map((premio) => (
                            <tr key={premio.idPremio}>
                                <td>{premio.nombrePremio}</td>
                                <td>
                                    {premio.idGanador
                                        ? ganadores[premio.idGanador] || 'Cargando...'
                                        : 'Aún no hay ganador'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListaGanadores;
