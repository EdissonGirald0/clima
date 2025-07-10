/**
 * Componente About que muestra información personal y del proyecto.
 * @module components/About
 */
import React, { useState, useEffect } from "react";
import './cssStilos/About.css';
import Foto from './cssStilos/punk.jpg';

/**
 * About
 * @returns {JSX.Element}
 */
export default function About(){
    const [reloj, setReloj] = useState({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
    });
    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            setReloj({
                hours: date.getHours(),
                minutes: date.getMinutes(),
                seconds: date.getSeconds()
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return(
        <div className="container edisson">
            <h1>Clima Mundial 🌎</h1>
            <h2>Sobre el Proyecto</h2>
            <p>
                <b>Clima Mundial</b> es una aplicación web moderna desarrollada en React que permite consultar el clima actual y el pronóstico extendido de ciudades alrededor del mundo. Utiliza la API de OpenWeatherMap y está optimizada para una experiencia de usuario intuitiva, rápida y visualmente atractiva.
            </p>
            <ul style={{textAlign: 'left', maxWidth: 600, margin: '0 auto 1.5rem auto'}}>
                <li>🔍 Búsqueda de ciudades con autocompletado</li>
                <li>📍 Clima local por geolocalización</li>
                <li>⭐ Sistema de favoritos</li>
                <li>📅 Pronóstico extendido de 5 días</li>
                <li>⚡ Interfaz responsiva y accesible</li>
                <li>🧑‍💻 Código abierto y documentado</li>
            </ul>
            <div style={{margin: '1.5rem 0'}}>
                <b>Tecnologías utilizadas:</b>
                <ul style={{textAlign: 'left', maxWidth: 600, margin: '0 auto'}}>
                    <li>React 18, React Router 6</li>
                    <li>JavaScript (ES6+), HTML5, CSS3</li>
                    <li>OpenWeatherMap API</li>
                    <li>PropTypes, Testing Library</li>
                    <li>Node.js, npm, nvm</li>
                    <li>Despliegue adaptable (Docker, Vercel, Netlify, etc.)</li>
                </ul>
            </div>
            <hr style={{margin: '2rem 0'}}/>
            <h2>Sobre el Creador</h2>
            <img src={Foto} alt="foto" className="fotor" style={{marginBottom: 0}}/>
            <h3>Edisson Giraldo</h3>
            <p>
                <b>Ingeniero de Software</b> graduado del Politécnico Grancolombiano.<br/>
                Apasionado por el desarrollo web, la inteligencia artificial y la automatización.<br/>
                Experiencia en React, Node.js, Docker, IA generativa y automatización de procesos.<br/>
                Siempre aprendiendo y explorando nuevas tecnologías.
            </p>
            <div style={{margin: '1rem 0'}}>
                <a href="https://github.com/EdissonGirald0" target="_blank" rel="noopener noreferrer" className="about-link">
                    <b>GitHub: @EdissonGirald0</b>
                </a>
                <br/>
                <a href="mailto:edisson.giraldo@hotmail.com" className="about-link">
                    <b>Correo: edisson.giraldo@.....</b>
                </a>
                <br/>
                <a href="www.linkedin.com/in/edisson-giraldo-01ab092ba" target="_blank" rel="noopener noreferrer" className="about-link">
                    <b>LinkedIn: /in/edisson-giraldo</b>
                </a>
            </div>
            <div>
                <h4>Reloj en tiempo real: {reloj.hours}:{reloj.minutes}:{reloj.seconds}</h4>
            </div>
            <hr style={{margin: '2rem 0'}}/>
            <div style={{fontStyle: 'italic', color: '#b03911', fontSize: '1.1rem'}}>
                “La tecnología es mejor cuando une a las personas.”
            </div>
        </div>
    )
}