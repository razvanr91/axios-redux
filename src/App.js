import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function App() {

  const counter = useSelector(state => state.counter);
  const signedStatus = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

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
            <h1>Counter = {counter}</h1>
            <button onClick={() => dispatch({ type: "INCREMENT" })} >Increment</button>
            <h1>{signedStatus ? "TRUE" : "FALSE"}</h1>
            <button onClick={() => dispatch({ type: "SIGN_IN" })} >Sign in status</button>
            <input onChange={weatherInput} type="texg" />
            <button onClick={searchWeather}>Search</button>
          </div>
          <div>
            <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
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
