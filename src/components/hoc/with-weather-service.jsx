import React from 'react';
import { WeatherServiceConsumer } from '../weather-service-context';

const withWeatherService = () => Wrapped => {
  return props => {
    return (
      <WeatherServiceConsumer>
        {weatherService => {
          return <Wrapped {...props} weatherService={weatherService} />;
        }}
      </WeatherServiceConsumer>
    );
  };
};

export default withWeatherService;
