/**
 * Servicio para consultar la API de OpenWeatherMap
 * @module services/weather
 */

/**
 * Obtiene los datos del clima para una ciudad específica.
 * @param {string} ciudad - Nombre de la ciudad a buscar.
 * @param {string} apiKey - API Key de OpenWeatherMap.
 * @returns {Promise<Object>} - Promesa que resuelve con los datos de la ciudad o null si no se encuentra.
 */
export async function fetchWeatherByCity(ciudad, apiKey) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`);
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
    console.error('Error al consultar la API del clima:', error);
    return null;
  }
}

/**
 * Obtiene el pronóstico extendido de 5 días para una ciudad por ID.
 * @param {number} cityId - ID de la ciudad (OpenWeatherMap)
 * @param {string} apiKey - API Key de OpenWeatherMap
 * @returns {Promise<Array>} - Array de objetos con pronóstico diario
 */
export async function fetchForecastByCityId(cityId, apiKey) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    if (!data.list) return [];
    // Agrupar por día (la API devuelve cada 3 horas)
    const days = {};
    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!days[date]) days[date] = [];
      days[date].push(item);
    });
    // Para cada día, obtener el promedio de temp, icono más frecuente, etc.
    return Object.entries(days).map(([date, items]) => {
      const temps = items.map(i => i.main.temp);
      const min = Math.min(...items.map(i => i.main.temp_min));
      const max = Math.max(...items.map(i => i.main.temp_max));
      const icons = items.map(i => i.weather[0].icon);
      const icon = icons.sort((a,b) => icons.filter(v=>v===a).length - icons.filter(v=>v===b).length).pop();
      const weather = items[0].weather[0].main;
      return {
        date,
        min: Math.round(min),
        max: Math.round(max),
        temp: Math.round(temps.reduce((a,b)=>a+b,0)/temps.length),
        icon,
        weather
      };
    });
  } catch (error) {
    console.error('Error al obtener el pronóstico:', error);
    return [];
  }
} 