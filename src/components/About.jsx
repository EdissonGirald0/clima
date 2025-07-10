/**
 * Componente About que muestra información personal y del proyecto.
 * @module components/About
 */
import React, { useState, useEffect } from "react";
import './cssStilos/About.css';
import Foto from './cssStilos/punk.jpg';

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
        <div className="container edisson about-main">
            <h1 className="about-title">🌎 Clima Mundial</h1>
            <section className="about-section">
                <h2 className="about-subtitle">Sobre el Proyecto</h2>
                <p className="about-desc">
                    <b>Clima Mundial</b> es una aplicación web moderna desarrollada en <b>React</b> que permite consultar el clima actual y el pronóstico extendido de ciudades alrededor del mundo. Utiliza la API de <b>OpenWeatherMap</b> y está optimizada para una experiencia de usuario intuitiva, rápida y visualmente atractiva.
                </p>
                <ul className="about-list">
                    <li>🔍 <b>Búsqueda de ciudades</b> con autocompletado</li>
                    <li>📍 <b>Clima local</b> por geolocalización</li>
                    <li>⭐ <b>Sistema de favoritos</b></li>
                    <li>📅 <b>Pronóstico extendido</b> de 5 días</li>
                    <li>⚡ <b>Interfaz responsiva</b> y accesible</li>
                    <li>🧑‍💻 <b>Código abierto</b> y documentado</li>
                </ul>
                <div className="about-tech">
                    <b>Tecnologías utilizadas:</b>
                    <div className="about-badges">
                        <span className="badge react">React 18</span>
                        <span className="badge router">React Router 6</span>
                        <span className="badge js">JavaScript ES6+</span>
                        <span className="badge css">CSS3</span>
                        <span className="badge api">OpenWeatherMap API</span>
                        <span className="badge node">Node.js</span>
                        <span className="badge test">Testing Library</span>
                        <span className="badge deploy">Vercel</span>
                    </div>
                </div>
            </section>
            <hr className="about-divider"/>
            <section className="about-section about-creator">
                <h2 className="about-subtitle">Sobre el Creador</h2>
                <div className="about-creator-flex">
                    <img src={Foto} alt="foto" className="fotor about-photo"/>
                    <div className="about-creator-info">
                        <h3 className="about-name">Edisson Giraldo</h3>
                        <p className="about-desc">
                            <b>Ingeniero de Software</b> graduado del Politécnico Grancolombiano.<br/>
                            Apasionado por el desarrollo web, la inteligencia artificial y la automatización.<br/>
                            Experiencia en React, Node.js, Docker, IA generativa y automatización de procesos.<br/>
                            Siempre aprendiendo y explorando nuevas tecnologías.
                        </p>
                        <div className="about-links">
                            <a href="https://github.com/EdissonGirald0" target="_blank" rel="noopener noreferrer" className="about-link">
                                <b>🐙 GitHub: @EdissonGirald0</b>
                            </a>
                            <a href="mailto:edisson.giraldo@hotmail.com" className="about-link">
                                <b>✉️ Correo: edisson.giraldo@.....</b>
                            </a>
                            <a href="https://www.linkedin.com/in/edisson-giraldo-01ab092ba" target="_blank" rel="noopener noreferrer" className="about-link">
                                <b>💼 LinkedIn: /in/edisson-giraldo</b>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="about-clock">
                <span role="img" aria-label="clock">⏰</span> Reloj en tiempo real: <b>{reloj.hours}:{reloj.minutes}:{reloj.seconds}</b>
            </div>
            <hr className="about-divider"/>
            <div className="about-quote">
                <span>“La tecnología es mejor cuando une a las personas.”</span>
            </div>
        </div>
    )
}