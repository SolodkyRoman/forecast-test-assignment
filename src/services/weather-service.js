const API_KEY = '3cf8f3856a70f7f3cb3234dbc2b796ac';
const API_URL = 'http://api.openweathermap.org/data/2.5/';

export default class WeatherService {
  formatTodayData = (data) => {
    if (data.cod !== 200) {
      return null;
    }
    
    return {
      cityName: data.name,
      countryCode: data.sys.country,
      maxTemp: data.main.temp_max.toFixed(1),
      iconName: data.weather[0].icon,
      pressure: data.main.pressure,
      wind: data.wind.speed,
      humidity: data.main.humidity,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    }
  }
  
  formatforecastData = (data) => {
    if (data.cod !== '200') {
      return null;
    }
    
    const forecasts = data.list.map((item) => {
      return {
        date: item.dt_txt,
        maxTemp: item.main.temp_max.toFixed(1),
        iconName: item.weather[0].icon,
        pressure: item.main.pressure,
        wind: item.wind.speed,
        humidity: item.main.humidity,
      }
    });
    
    return {
      list: forecasts,
      cityName: data.city.name,
      countryCode: data.city.country,
    }
  }

  getWeather = (city) => {
    return fetch(`
      ${API_URL}weather?q=${city}&units=metric&appid=${API_KEY}
    `)
    .then(res => {
      return res.json();
    })
    .then(data => { 
      return this.formatTodayData(data);
    })
    .catch(err =>  { throw new Error('An error has occured') });
  };

  getForecast = (city) => {
    return fetch(`
      ${API_URL}forecast?q=${city}&units=metric&appid=${API_KEY}
    `)
    .then(res => {
      return res.json();
    })
    .then(data => { 
      return this.formatforecastData(data);
    })
    .catch(err =>  { throw new Error('An error has occured') });
  };
}