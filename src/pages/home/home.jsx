import React from 'react';
import { connect } from 'react-redux';
import SearchForm from '../../components/search-form';
import RequestHistory from '../../components/request-history';
import WeatherForToday from '../../components/weather-for-today';
import './home.css';

const Home = ({ forecasts, todayForecast, loading, emptyResponse, error }) => {
  return (
    <div className="home">
      <div className="container home__container">
        <SearchForm />
        <RequestHistory forecasts={forecasts} />
        <WeatherForToday
            forecasts={forecasts}
            todayForecast={todayForecast}
            emptyResponse={emptyResponse} 
            loading={loading}
            error={error} />
      </div>
    </div>
  );
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

export default connect(mapStateToProps)(Home);
