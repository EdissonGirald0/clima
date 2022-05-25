import React, { useState, useEffect } from "react";
import './cssStilos/About.css'
import Foto from './cssStilos/punk.jpg'
const date = new Date();
export default function About(){
    const [reloj, setReloj] = useState({ hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
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
        <div className="container, edisson">
            <h1 >Edisson Giraldo</h1>
            <img src={Foto} alt="foto" className="fotor"/>
            <div>
                <h5>Auto-ditacta apasionado por aprender nuevas tecnologias</h5>
               <h4> {reloj.hours}:{reloj.minutes}:{reloj.seconds}</h4>
            </div>


        </div>
    )
}