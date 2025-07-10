/**
 * Barra de búsqueda mejorada con autocompletado y validaciones.
 * @module components/SearchBar
 */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import './cssStilos/SearchBar.css';

/**
 * SearchBar
 * @param {Object} props
 * @param {function} onSearch - Función para buscar ciudades
 * @param {boolean} [isLoading=false] - Estado de carga
 * @returns {JSX.Element}
 */
export default function SearchBar({ onSearch, isLoading = false }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Ciudades populares para sugerencias
  const popularCities = [
    "Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao",
    "New York", "London", "Paris", "Tokyo", "Sydney",
    "Buenos Aires", "México", "Bogotá", "Lima", "Santiago"
  ];

  useEffect(() => {
    if (city.length > 2) {
      const filtered = popularCities.filter(c => 
        c.toLowerCase().includes(city.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Por favor ingresa el nombre de una ciudad");
      return;
    }
    if (city.length < 2) {
      setError("El nombre de la ciudad debe tener al menos 2 caracteres");
      return;
    }
    setError("");
    onSearch(city.trim());
    setCity("");
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar ciudad..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => city.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            disabled={isLoading}
            className={`search-input ${error ? 'error' : ''}`}
            aria-label="Buscar ciudad"
            aria-describedby={error ? "search-error" : undefined}
          />
          <button 
            type="submit" 
            disabled={isLoading || !city.trim()}
            className="search-button"
            aria-label="Buscar"
          >
            {isLoading ? (
              <div className="button-spinner"></div>
            ) : (
              "🔍"
            )}
          </button>
        </div>
        
        {error && (
          <div id="search-error" className="error-message" role="alert">
            {error}
          </div>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list" role="listbox">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
                role="option"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSuggestionClick(suggestion);
                  }
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};
