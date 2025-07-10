/**
 * Componente principal de la aplicación de clima.
 * Maneja el estado global de las ciudades y la navegación.
 * @module containers/App
 */
import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from '../components/Nav.jsx';
import Cards from '../components/Cards.jsx';
import About from '../components/About';
import City from '../components/Ciudad';
import LoadingSpinner from '../components/LoadingSpinner';
import { Routes, Route, useParams } from 'react-router-dom';
import { fetchWeatherByCity } from '../services/weather';

const apiKey = 'c59ca29e00f8bdd8855e022734093d04';

/**
 * Obtiene el clima por coordenadas (lat, lon) usando la API de OpenWeatherMap.
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<Object|null>}
 */
async function fetchWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const recurso = await response.json();
    if (recurso.main !== undefined) {
      return {
        min: Math.round(recurso.main.temp_min),
        max: Math.round(recurso.main.temp_max),
        img: recurso.weather[0].icon,
        id: recurso.id,
        wind: recurso.wind.speed,
        temp: recurso.main.temp,
        name: recurso.name,
        weather: recurso.weather[0].main,
        clouds: recurso.clouds.all,
        latitud: recurso.coord.lat,
        longitud: recurso.coord.lon
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al consultar la API del clima por coordenadas:', error);
    return null;
  }
}

function CityWrapper({ cities }) {
  const { ciudadId } = useParams();
  const city = cities.find(c => c.id === parseInt(ciudadId));
  return <City city={city} />;
}

/**
 * Componente App
 * @returns {JSX.Element}
 */
function App() {
  const [cities, setCities] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Elimina una ciudad del estado por su ID.
   * @param {number} id - ID de la ciudad a eliminar.
   */
  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
    // También remover de favoritos si está ahí
    setFavorites(oldFavorites => oldFavorites.filter(favId => favId !== id));
  }

  /**
   * Busca una ciudad y la agrega al estado si no existe.
   * @param {string} ciudad - Nombre de la ciudad a buscar.
   */
  async function onSearch(ciudad) {
    setError(null);
    setIsLoading(true);
    
    try {
      // Evitar duplicados
      if (cities.some(c => c.name.toLowerCase() === ciudad.toLowerCase())) {
        setError('La ciudad ya está en la lista.');
        return;
      }
      
      const data = await fetchWeatherByCity(ciudad, apiKey);
      if (data) {
        setCities(oldCities => [...oldCities, data]);
      } else {
        setError('Ciudad no encontrada o error en la consulta.');
      }
    } catch (error) {
      setError('Error al buscar la ciudad. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Filtra una ciudad por su ID.
   * @param {string} ciudadId - ID de la ciudad.
   * @returns {Object|null} - Objeto ciudad o null si no existe.
   */
  function onFilter(ciudadId) {
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
    if (ciudad.length > 0) {
      return ciudad[0];
    } else {
      return null;
    }
  }

  /**
   * Cambia el estado de favorito de una ciudad.
   * @param {number} cityId - ID de la ciudad.
   */
  function onToggleFavorite(cityId) {
    setFavorites(oldFavorites => {
      if (oldFavorites.includes(cityId)) {
        return oldFavorites.filter(id => id !== cityId);
      } else {
        return [...oldFavorites, cityId];
      }
    });
  }

  /**
   * Obtiene el clima de la ubicación actual del usuario.
   */
  async function handleGetLocalWeather() {
    setError(null);
    setGeoLoading(true);
    if (!navigator.geolocation) {
      setError('La geolocalización no está soportada en este navegador.');
      setGeoLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await fetchWeatherByCoords(latitude, longitude);
      if (data) {
        if (!cities.some(c => c.id === data.id)) {
          setCities(oldCities => [...oldCities, data]);
        } else {
          setError('El clima de tu ubicación ya está en la lista.');
        }
      } else {
        setError('No se pudo obtener el clima de tu ubicación.');
      }
      setGeoLoading(false);
    }, (err) => {
      setError('No se pudo obtener la ubicación. Permiso denegado o error.');
      setGeoLoading(false);
    });
  }

  return (
    <div className="App">
      <Nav onSearch={onSearch} isLoading={isLoading || geoLoading} />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route
          path="/"
          element={
            <div className="main-content">
              <button
                className="geo-btn"
                onClick={handleGetLocalWeather}
                disabled={geoLoading || isLoading}
                aria-label="Obtener clima de mi ubicación"
                style={{ marginBottom: 20 }}
              >
                {geoLoading ? 'Obteniendo clima local...' : '🌎 Obtener clima de mi ubicación'}
              </button>
              {error && (
                <div className="error-container" role="alert">
                  <span className="error-icon">⚠️</span>
                  <span className="error-text">{error}</span>
                  <button
                    onClick={() => setError(null)}
                    className="error-close"
                    aria-label="Cerrar mensaje de error"
                  >
                    ✕
                  </button>
                </div>
              )}
              {isLoading && (
                <div className="loading-overlay">
                  <LoadingSpinner message="Buscando ciudad..." />
                </div>
              )}
              <Cards
                cities={cities}
                onClose={onClose}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
              />
              {cities.length === 0 && !isLoading && (
                <div className="empty-state">
                  <div className="empty-icon">🌍</div>
                  <h3>¡Comienza a explorar el clima!</h3>
                  <p>Busca una ciudad o usa tu ubicación para ver su información meteorológica</p>
                </div>
              )}
            </div>
          }
        />
        <Route path="/ciudad/:ciudadId" element={<CityWrapper cities={cities} />} />
      </Routes>
    </div>
  );
}

export default App;
