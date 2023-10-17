import React, { useState } from "react";
import "./weather.css";

const api = {
  key: "92be35bf46d93081ae004cfa5359ec1d",
  base: "http://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [weather, setweather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");
  const [showWeather, setShowWeather] = useState(false);
  const [advice, setAdvice] = useState("");
  const [forecast, setforecast] = useState([]);
  const [showforecast, setShowForecast] = useState(false);

  const getWeathericon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`; 
  };

  const weatFun = () => {
    fetch(`${api.base}weather?q=belfast&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setweather(result);
        setWeatherIcon(result.weather[0].icon);
        setAdvice(createAdvice(result.weather[0].main, result.main.temp));
      });

      setShowWeather(!showWeather);
    
  };

  const Forecast = () => {
    fetch(`${api.base}forecast?q=belfast&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const timeForecast = result.list.filter(
            (item) => new Date(item.dt * 1000).getHours() === 13 || new Date(item.dt * 1000).getHours() === 19
          );
          setforecast(timeForecast.slice(0, 4));
      });
      setShowForecast(!showforecast);
  };


  const createAdvice = (weatherCondition, temperature) => {
    if (weatherCondition === "Rain") {
      return <> Don't forget your umbrella or rain coat!</>;
    } else if (weatherCondition === "Clouds") {
      return (
        <>
          It's a bit cloudy today. <br /> Jackets are advised but not neccessary{" "}
        </>
      );
    } else if (temperature > 25) {
      return (
        <>It's a hot day, dress lightly! Shorts, t-shirts and dresses advised</>
      );
    } else if (temperature < 10) {
      return <>You will need a jacket. Bit too cold outside without one. </>;
    } else {
      return <>Enjoy the weather, Normal everyday clothes will be suffice</>;
    }
  };

  return (
    <div className="weatherWrapper">
      <h2> Weather and advice</h2>
      <button onClick={weatFun}>Current weather of location</button>
      {showWeather && (
        <div>
          <p>City: {weather.name}</p>
          <p>Temperature: {weather.main && weather.main.temp}°C</p>
          <p>
            Advice:
            <br /> {advice}
          </p>
          {weather.weather && (
           <div>
           <p>
             {weather.weather[0].description}
             {weatherIcon && (
               <img src={getWeathericon(weatherIcon)} alt="weatherIcon" />
             )}
           </p>
           <h3>future weather predictions</h3>
           <button onClick={Forecast}>Get Weather Forecast</button>
           {showforecast && forecast.length > 0 && (
            <div className="forecast">
                <h3>Weather Forecast</h3>
                <h4>weather prediction over the next couple of days at set times</h4>
                {forecast.map((item) => (
                <div key={item.dt}>
                    <p>Date & Time: {new Date(item.dt * 1000).toLocaleString()}</p>
                    <p>Temperature: {item.main.temp}°C</p>
                    <p>Description: {item.weather[0].description}</p>
                    <br />
                </div>
                ))}
            </div>
            )}
         </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
