const forecastRequested = () => {
    return {
        type: 'FETCH_FORECAST_REQUEST',
        payload: {
            loading: true,
            forecast: null,
            error: null
        }
    }
};

const forecastLoaded = forecast => {
    return {
        type: 'FETCH_FORECAST_SUCCESS',
        payload: forecast,
    }
};

const forecastError = (err) => {
    return {
        type: 'FETCH_FORECAST_SUCCESS',
        payload: {
            loading: false,
            forecast: null,
            error: null
        }
    }
};

const todayForecastChanged = (cityName) => {
    return {
        type: 'TODAY_FORECAST_CHANGE',
        payload: cityName
    };
};

export {
    forecastRequested,
    forecastLoaded,
    forecastError,
    todayForecastChanged
};
