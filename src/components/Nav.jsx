/**
 * Barra de navegación principal de la aplicación.
 * @module components/Nav
 */
import React from 'react';
import PropTypes from 'prop-types';
import Logo from './cssStilos/punk.jpg'
import SearchBar from './SearchBar.jsx';
import './cssStilos/Nav.css';
import { Link } from "react-router-dom";

/**
 * Nav
 * @param {Object} props
 * @param {function} onSearch - Función para buscar ciudades
 * @param {boolean} [isLoading=false] - Estado de carga
 * @returns {JSX.Element}
 */
function Nav({onSearch, isLoading = false}) {
  return (
    <nav className="navbar nav">
      <Link to='/'>
        <span className="navbar-brand">
          <img id="logo" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="logo" />
          Weather App
        </span>
      </Link>
      <Link to='/about'>
        <span>About</span>
      </Link>
        <SearchBar
          onSearch={onSearch}
          isLoading={isLoading}
        />
    </nav>
  );
};

Nav.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default Nav;
