import React from 'react';
import Logo from './cssStilos/punk.jpg'
import SearchBar from './SearchBar.jsx';
import './cssStilos/Nav.css';
import { Link } from "react-router-dom";

function Nav({onSearch}) {
  return (
    <nav className="navbar nav">
      <Link to='/'>
        <span className="navbar-brand">
          <img id="logo" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
          Weather App
        </span>
      </Link>
      <Link to='/about'>
        <span>About</span>
      </Link>
        <SearchBar
          onSearch={onSearch}
        />
    </nav>
  );
};

export default Nav;
