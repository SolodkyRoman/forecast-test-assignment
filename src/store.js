import { createStore } from 'redux';

const initialState = {
    loading: false,
    error: null,
    todayForecast: null,
    emptyResponse: false,
    forecasts: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_FORECAST_REQUEST':
            return { 
                ...state,
                loading: true
            };
        case 'FETCH_FORECAST_SUCCESS':
            if (!action.payload) {
                return {
                    ...state,
                    loading: false,
                    error: null,
                    todayForecast: null,
                    emptyResponse: true
                }
            }
            if (state.forecasts.length) {
                const forecast = state.forecasts.find((f) => { 
                    return f.cityName === action.payload.cityName; 
                });
                if (forecast) {
                    return {
                        ...state,
                        loading: false,
                        error: null,
                        todayForecast: action.payload.cityName,
                        emptyResponse: false
                    }
                }
            }
            let forecasts = [
                ...state.forecasts,
                action.payload
            ];
            if (forecasts.length > 5) {
                forecasts.shift();
            }
            return {
                ...state,
                loading: false,
                error: null,
                todayForecast: action.payload.cityName,
                emptyResponse: false,
                forecasts
            }
        case 'FETCH_FORECAST_ERROR':
            return {
                ...state,
                loading: false,
                error: true,
                todayForecast: null,
                emptyResponse: false,
            }
        case 'TODAY_FORECAST_CHANGE':
            return {
                ...state,
                todayForecast: action.payload,
                emptyResponse: false,
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;