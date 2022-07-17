import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

const WeatherForecast = ({ avgTemp, setAvgTemp }) => {
    // const [avgTemp, setAvgTemp] = useState(null);
    const [dayCond, setDayCond] = useState(null);
    const [lowTemp, setLowTemp] = useState(null);
    const [highTemp, setHighTemp] = useState(null);

    const getWeather = async () => {
        try {
            const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${process.env.REACT_APP_WEATHER_ZIPCODE}`);
            const forecast = await res.json();
            setAvgTemp(forecast.forecast.forecastday[0].day.avgtemp_f);
            setDayCond(forecast.forecast.forecastday[0].day.condition.text);
            setLowTemp(forecast.forecast.forecastday[0].day.mintemp_f);
            setHighTemp(forecast.forecast.forecastday[0].day.maxtemp_f);
            console.log(forecast);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getWeather();
    }, []);


    return (
        <div>
            <div>{avgTemp}</div>
            <div>{dayCond}</div>
            <div>{lowTemp}</div>
            <div>{highTemp}</div>
        </div>
    )
};

WeatherForecast.propTypes = {
    avgTemp: PropTypes.number,
    setAvgTemp: PropTypes.func,
};

export default WeatherForecast;