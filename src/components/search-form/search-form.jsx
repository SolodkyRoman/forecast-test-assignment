import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withWeatherService } from '../hoc';
import {
  forecastRequested,
  forecastLoaded,
  forecastError,
  todayForecastChanged
} from '../../actions';
import './search-form.css';

class SearchForm extends Component {
  state = {
    cityName: '',
    error: false,
  };

  handleCityChange = ({ target: { value } }) => {
    this.setState({ cityName: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      weatherService,
      forecastRequested,
      forecastLoaded,
      todayForecastChanged
    } = this.props;
    let { todayForecast } = this.props;
    let { cityName } = this.state;

    cityName = cityName.trim().toLowerCase();
    if (!cityName.length) return;
    
    if (todayForecast) {
      todayForecast = todayForecast.toLowerCase();
      if (cityName === todayForecast) return;
    }
    
    const loadedForecastData = this.props.forecasts.find((f) => { 
      return f.cityName.toLowerCase() === cityName;
    });

    if (loadedForecastData) {
      todayForecastChanged(loadedForecastData.cityName);
      return; 
    }
    
    forecastRequested();
    weatherService
      .getWeather(cityName)
      .then(data => forecastLoaded(data))
      .catch(err => forecastError(err));
  };

  render() {
    const { cityName } = this.state;
    const { loading } = this.props;

    return (
      <form className="form text-center" onSubmit={this.handleSubmit}>
        <p className="h4 text-center">Enter your city</p>
        <div className="input-group">
          <input
            value={cityName}
            onChange={this.handleCityChange}
            type="text"
            className="form-control"
            placeholder="City"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            disabled={loading}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" disabled={loading}>
              Button
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { 
    forecasts,
    todayForecast,
    loading,
  } = state;
  return { 
    forecasts,
    todayForecast,
    loading
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      forecastRequested,
      forecastLoaded,
      forecastError,
      todayForecastChanged
    },
    dispatch
  );
};

export default withWeatherService()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchForm)
);
