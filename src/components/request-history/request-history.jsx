import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withWeatherService } from '../hoc';
import { todayForecastChanged } from '../../actions';
import './request-history.css';

const RequestHistory = ({ forecasts, todayForecastChanged }) => {
    if (!forecasts.length) {
        return (
            <div className="request-history">
                <p>Your history will be shown here</p>
            </div>
        )
    }

    return (
        <div className="request-history">
            <p>History:</p>
            <ul className="request-history__list">
                { 
                    forecasts.map((city, idx) => {
                        return (
                            <li className="request-history__list__item" key={idx}>
                                <button 
                                    className="btn btn-link"
                                    onClick={
                                        () => {
                                            todayForecastChanged(city.cityName);
                                        }
                                    }>{city.cityName}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
return bindActionCreators(
    {
        todayForecastChanged
    },
    dispatch
);
};
  
export default withWeatherService()(connect(null, mapDispatchToProps)(RequestHistory));
