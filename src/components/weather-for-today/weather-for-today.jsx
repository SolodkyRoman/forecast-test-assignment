import React from 'react';
import { Link } from 'react-router-dom';
import './weather-for-today.css';
import Preloader from '../preloader';

const WeatherForToday = ({ forecasts, todayForecast, emptyResponse, loading, error }) => {
    const forecast = forecasts.find((f) => { 
        return f.cityName === todayForecast; 
    });
    if (loading) {
        return <Preloader />;
    };
    
    if (emptyResponse) {
        return <p className="h5">Unfortunately, there is no information for this city</p>;
    }

    if (error) {
        return <p className="h5">An error has occured :(</p>;
    }
    
    if (!forecasts.length) {
        return <p className="h5"></p>;
    }

    const date = new Date();
    const sunriseDate = new Date(forecast.sunrise * 1000);
    const sunsetDate = new Date(forecast.sunset * 1000);

    return (
        <div className="weather">
            <p className="h3 text-center">
                Weather in {forecast.cityName}, {forecast.countryCode} ({date.getDate()}.{date.getMonth() + 1}.
                {date.getFullYear()})
            </p>
            <div className="text-center">
                <Link to={`/${forecast.cityName}`}>See weather forecast for 5 days</Link>
            </div>
            <div className="weather__container">
                <div className="weather__card">
                    <img
                        className="weather-card__icon"
                        src={`https://openweathermap.org/img/wn/${forecast.iconName}@2x.png`}
                        alt="weather"
                    />
                    <span className="h1 weather-card__temp">{forecast.maxTemp} C</span>
                </div>
                <div className="weather__card weather__table">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th scope="row">Pressure</th>
                            <td>{forecast.pressure} hpa</td>
                        </tr>
                        <tr>
                            <th scope="row">Humidity</th>
                            <td>{forecast.humidity}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Wind speed</th>
                            <td>{forecast.wind} m/s</td>
                        </tr>
                        <tr>
                            <th scope="row">Sunrise</th>
                            <td>
                                {sunriseDate.getDate()}
                                :
                                {(sunriseDate.getMinutes() < 10 ? '0': null)}
                                {sunriseDate.getMinutes()}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Sunset</th>
                            <td>
                                {sunsetDate.getHours()}
                                :
                                {(sunsetDate.getMinutes() < 10 ? '0': null)}
                                {sunsetDate.getMinutes()}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WeatherForToday;
