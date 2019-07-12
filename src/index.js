import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import WeatherService from './services/weather-service';
import { WeatherServiceProvider } from './components/weather-service-context';
import store from './store';

const weatherService = new WeatherService();

ReactDOM.render(
    <Provider store={store}>
        <WeatherServiceProvider value={weatherService}>
            <App />
        </WeatherServiceProvider>
    </Provider>,
    document.getElementById('root')
);
