import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=London&aqi=yes`)
      .then(data => {
        setWeather(data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const weatherInput = (e) => {
    setInput(e.target.value);
  }

  const searchWeather = () => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}&aqi=yes`)
      .then(data => {
        setWeather(data.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="App">
      {weather && (
        <div>
          <div>
            <input onChange={weatherInput} type="texg" />
            <button onClick={searchWeather}>Search</button>
          </div>
          <div>
            <img src={weather.current.condition.icon} />
            <h1>{weather.location.name}</h1>
            <h2>{weather.location.region}</h2>
            <h3>{weather.current.temp_c}&#8451;</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
