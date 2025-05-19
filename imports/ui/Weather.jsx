import axios from "axios";
import React, { useEffect, useState } from "react";

const API_KEY = "ce309858c9580a2f86ac0e0f45374afb";

const Weather = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [cityName, setCityName] = useState("");
  const [temp, setTemp] = useState(0);
  const [unit, setUnit] = useState("F");
  const [iconType, setIconType] = useState("");

  const handleUnitChangeClick = () => {
    if (unit === "F") {
      const fToC = (temp - 32) / (9 / 5);
      setUnit("C");
      setTemp(fToC);
      
    } else {
      const cToF = (temp * 9) / 5 + 32;
      setUnit("F");
      setTemp(cToF);
    }
  };

  useEffect(() => {
    const getWeather = async (lat, lon) => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      console.log(response.data);
      setCityName(response.data.name);
      setTemp(response.data.main.temp);
      setIconType(response.data.weather[0].icon);
      return response.data;
    };

    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <div>
        <img src={`http://openweathermap.org/img/wn/${iconType}@2x.png`} />
      </div>
      <h1>{cityName}</h1>
      <div>
        {lat},{lon}
      </div>
      <h2>
        {temp}°{unit}
      </h2>
      {/* <button>Get Weather</button> */}
      <button onClick={handleUnitChangeClick}>Celsius / Fahrenheit</button>
    </div>
  );
};

export default Weather;
