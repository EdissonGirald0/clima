/**
 * Componente que muestra la información detallada de una ciudad y su pronóstico extendido.
 * @module components/Ciudad
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './cssStilos/About.css';
import Forecast from './Forecast';
import { fetchForecastByCityId } from '../services/weather';

const apiKey = 'c59ca29e00f8bdd8855e022734093d04';

/**
 * Ciudad
 * @param {Object} props
 * @param {Object} city - Objeto con los datos de la ciudad
 * @returns {JSX.Element}
 */
export default function Ciudad({ city }){
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (city && city.id) {
            setLoading(true);
            setError(null);
            fetchForecastByCityId(city.id, apiKey)
                .then(data => setForecast(data))
                .catch(() => setError('No se pudo obtener el pronóstico.'))
                .finally(() => setLoading(false));
        }
    }, [city]);

    if (!city) return <div>No se encontró la ciudad.</div>;
    return(
        <div className='edisson'>
            <div className='container'>
                <h2>{city.name}</h2>
                <div className='info'>
                    <div>Temperatura: {city.temp} °C</div>
                    <div>Clima: {city.weather} </div>
                    <div>Vientos: {city.wind} km/h</div>
                    <div>Cantidad: de nubes: {city.clouds}  </div>
                    <div>Latitud: {city.latitud}° </div>
                    <div>Longitud: {city.longitud}° </div>
                </div>
                <h3 style={{marginTop: 30}}>Pronóstico extendido (5 días)</h3>
                {loading && <div style={{margin: '20px 0'}}>Cargando pronóstico...</div>}
                {error && <div style={{color: 'red'}}>{error}</div>}
                {!loading && !error && <Forecast forecast={forecast} />}
            </div>
        </div>
    )
}

Ciudad.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string,
    temp: PropTypes.number,
    weather: PropTypes.string,
    wind: PropTypes.number,
    clouds: PropTypes.number,
    latitud: PropTypes.number,
    longitud: PropTypes.number,
    id: PropTypes.number
  })
};