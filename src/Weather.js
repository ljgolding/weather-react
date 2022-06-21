import axios from "axios";
import React, { useState } from "react";
import "./Weather.css";

export default function Weather() {
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");

  const [city, setCity] = useState("");

  function showTemperature(response) {
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(Math.round(response.data.wind.speed));
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiKey = "f3dfa8d7baf16dece455736a2124255f";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="WeatherSearch">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Type a city" onChange={changeCity} />
        <input type="submit" value="Search" />
      </form>
    </div>
  );

  if (temperature) {
    return (
      <div className="WeatherResult">
        {form}
        <ul>
          <li> Temperature: {temperature} °C </li>
          <li> Description: {description} </li>
          <li> Humidity: {humidity} % </li>
          <li> Wind: {wind} km/h</li>
          <li className="icon">
            {" "}
            <img src={icon} alt={description} />{" "}
          </li>
        </ul>
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}
