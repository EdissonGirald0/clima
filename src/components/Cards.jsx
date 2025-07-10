/**
 * Componente que renderiza una lista de tarjetas de ciudades.
 * @module components/Cards
 */
import React from 'react';
import PropTypes from 'prop-types';
import './cssStilos/Cards.css';
import Card from './Card.jsx';

/**
 * Cards
 * @param {Object} props
 * @param {Array} cities - Lista de ciudades
 * @param {function} onClose - Función para cerrar una tarjeta
 * @param {Array} favorites - Lista de IDs de ciudades favoritas
 * @param {function} onToggleFavorite - Función para cambiar estado de favorito
 * @returns {JSX.Element}
 */
export default function Cards({cities, onClose, favorites = [], onToggleFavorite}) {
  return (
    <div className='cards'>
      {cities.map(c => (
        <Card
          key={c.id}
          max={c.max}
          min={c.min}
          name={c.name}
          img={c.img}
          id={c.id}
          onClose={() => onClose(c.id)}
          isFavorite={favorites.includes(c.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

Cards.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
  })).isRequired,
  onClose: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number),
  onToggleFavorite: PropTypes.func
};
