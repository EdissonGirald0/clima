import React from 'react';
import './cssStilos/About.css'


export default function Ciudad({ city }){
    return(

        <div className='edisson'>
            <div className='container'>
                <h2>{city.name}</h2>
                <div className='info'>
                    <div>Temperatura: {city.temp} °C</div>
                    <div>Clima: {city.weather} </div>
                    <div>Vientos: {city.wind} km/h</div>
                    <div>Cantidad: de nubes: {city.clouds}  </div>
                    <div>Latitud: {city.latitud}° </div>
                    <div>Longitud: {city.longitud}° </div>
                </div>
            </div>
        </div>
    )
}