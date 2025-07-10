/**
 * Componente de loading spinner reutilizable.
 * @module components/LoadingSpinner
 */
import React from 'react';
import './cssStilos/LoadingSpinner.css';

/**
 * LoadingSpinner
 * @param {Object} props
 * @param {string} [props.size='medium'] - Tamaño del spinner (small, medium, large)
 * @param {string} [props.message='Cargando...'] - Mensaje a mostrar
 * @returns {JSX.Element}
 */
export default function LoadingSpinner({ size = 'medium', message = 'Cargando...' }) {
  return (
    <div className={`loading-container ${size}`}>
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
} 