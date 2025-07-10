/**
 * Componente que muestra la información básica de una ciudad con mejoras visuales.
 * @module components/Card
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './cssStilos/Card.css';
import { Link } from 'react-router-dom';

/**
 * Card
 * @param {Object} props
 * @param {number} min - Temperatura mínima
 * @param {number} max - Temperatura máxima
 * @param {string} name - Nombre de la ciudad
 * @param {string} img - Código del icono de clima
 * @param {function} onClose - Función para cerrar la tarjeta
 * @param {number} id - ID de la ciudad
 * @param {boolean} [isFavorite=false] - Si la ciudad es favorita
 * @param {function} [onToggleFavorite] - Función para cambiar estado de favorito
 * @returns {JSX.Element}
 */
export default function Card({ min, max, name, img, onClose, id, isFavorite = false, onToggleFavorite }) {
  const [isHovered, setIsHovered] = useState(false);

  const getWeatherColor = (temp) => {
    if (temp >= 30) return '#ff6b6b'; // Caliente
    if (temp >= 20) return '#ffd93d'; // Templado
    if (temp >= 10) return '#6bcf7f'; // Fresco
    return '#4dabf7'; // Frío
  };

  const getWeatherEmoji = (temp) => {
    if (temp >= 30) return '🔥';
    if (temp >= 20) return '☀️';
    if (temp >= 10) return '🌤️';
    return '❄️';
  };

  return (
    <div 
      className={`card ${isHovered ? 'card-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--temp-color': getWeatherColor(max),
        '--temp-color-light': getWeatherColor(min)
      }}
    >
      <div className="card-header">
        <div className="card-actions">
          {onToggleFavorite && (
            <button 
              onClick={() => onToggleFavorite(id)}
              className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
          <button 
            onClick={onClose} 
            className="close-btn"
            aria-label="Cerrar tarjeta"
          >
            ✕
          </button>
        </div>
        <div className="weather-emoji">
          {getWeatherEmoji(max)}
        </div>
      </div>

      <div className="card-body">
        <Link to={`/ciudad/${id}`} className="city-link">
          <h5 className="card-title">{name}</h5>
        </Link>
        
        <div className="weather-info">
          <div className="temperature-section">
            <div className="temp-item">
              <span className="temp-label">Mín</span>
              <span className="temp-value min-temp">{min}°</span>
            </div>
            <div className="temp-item">
              <span className="temp-label">Máx</span>
              <span className="temp-value max-temp">{max}°</span>
            </div>
          </div>
          
          <div className="weather-icon">
            <img 
              src={`http://openweathermap.org/img/wn/${img}@2x.png`} 
              width="80" 
              height="80" 
              alt={`Icono del clima de ${name}`}
              className="weather-img"
            />
          </div>
        </div>

        <div className="card-footer">
          <div className="weather-indicator">
            <div 
              className="temp-bar"
              style={{
                background: `linear-gradient(90deg, var(--temp-color-light) 0%, var(--temp-color) 100%)`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func
};
