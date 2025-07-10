/**
 * Componente para mostrar el pronóstico extendido de 5 días.
 * @module components/Forecast
 */
import React from 'react';
import PropTypes from 'prop-types';
import './cssStilos/Forecast.css';

/**
 * Forecast
 * @param {Object} props
 * @param {Array} forecast - Array de objetos de pronóstico diario
 * @returns {JSX.Element}
 */
export default function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;
  // Mostrar solo los próximos 5 días
  const days = forecast.slice(0, 5);
  return (
    <div className="forecast-container">
      {days.map(day => (
        <div className="forecast-card" key={day.date}>
          <div className="forecast-date">{new Date(day.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
          <img
            src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt={day.weather}
            className="forecast-icon"
            width={48}
            height={48}
          />
          <div className="forecast-temp">
            <span className="forecast-max">{day.max}°</span>
            <span className="forecast-min">{day.min}°</span>
          </div>
          <div className="forecast-weather">{day.weather}</div>
        </div>
      ))}
    </div>
  );
}

Forecast.propTypes = {
  forecast: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired
  }))
}; 