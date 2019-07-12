import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withWeatherService } from '../../components/hoc';
import {
  forecastRequested,
  forecastLoaded,
  forecastError
} from '../../actions';
import Preloader from '../../components/preloader';
import './detailed.css';


const ForecastCard = ({ forecast }) => {
  return (
    <>
      <p className="h2">Weather forecast</p>
      <p className="h4">{forecast.cityName}, {forecast.countryCode}</p>
      <div className="detailed__forecast">
        {
          forecast.list.map((f, idx) => {
            const date = new Date(f.date);
            return (
                  <div className="detailed__card" key={idx}>
                    <p className="detailed__card__time">
                      {date.getDate()}.
                      {
                        date.getMonth() + 1 < 10 ? 
                        '0' + (date.getMonth() + 1) :
                        date.getMonth() + 1
                      }
                      {', '}
                      {date.getHours()}:
                      {
                        date.getMinutes() < 10 ? 
                        '0' + date.getMinutes() :
                        date.getMinutes()
                      } 
                    </p>
                    <div className="detailed__card__main">
                      <img
                          className="detailed__card__icon"
                          src={`https://openweathermap.org/img/wn/${f.iconName}@2x.png`}
                          alt="weather"
                      />
                      <span className="h3 detailed__card__temp">{f.maxTemp} &deg;C</span>
                    </div>
                    <ul className="detailed__card__list">
                      <li className="detailed__card__list__item">
                        <b>Pressure:</b> 
                        <span>
                        {f.pressure}
                        </span>
                      </li>
                      <li className="detailed__card__list__item">
                        <b>Humidity:</b> 
                        <span>
                          {f.humidity}%
                        </span>
                      </li>
                      <li className="detailed__card__list__item">
                        <b>Wind speed:</b> 
                        <span>
                          {f.wind}m/s 
                        </span>
                      </li>
                    </ul>
                  </div>
            );
          })
        }
      </div>
    </>
  );
}

class Detailed extends Component {
  state = {
    forecast: null,
    loading: true,
  };

  componentDidMount() {
    const { 
      match: { params }, 
      forecasts 
    } = this.props;
    const { city } = params;
    const {
      weatherService,
    } = this.props;
    
    if (!forecasts.length) {
      this.props.history.push('/');
      return;
    }

    weatherService
      .getForecast(city)
      .then(data => {
        this.setState({ 
          forecast: data,
          loading: false
        });
      });
  }

  render() {
    const { forecast, loading } = this.state;

    return (
      <div className="detailed">
        <div className="container detailed__container">
          {
            loading ? <Preloader /> : null
          }
          {
            forecast ? <ForecastCard forecast={forecast} /> : null
          }
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  const { forecasts, todayForecast, loading, emptyResponse } = state;
  return {
    forecasts,
    todayForecast,
    loading,
    emptyResponse
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      forecastRequested,
      forecastLoaded,
      forecastError
    },
    dispatch
  );
};

export default withWeatherService()(connect(mapStateToProps, mapDispatchToProps)(Detailed));
