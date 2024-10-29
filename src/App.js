import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const apiKey = "b569296d2cea6a189834774440bfeffd";

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
        setError(null); // Clear any previous error
      } catch (error) {
        setError("City not found");
        setData({}); // Clear previous data on error
      }
      setLocation(""); // Clear the input field
    }
  };

  return (
    <div className="app">
      <h1>Weather Application</h1>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="result">
        {data && data.main ? ( // Check if data and data.main exist
          <>
            <h2>
              {data.name}, {data.sys.country}
            </h2>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Feels Like: {data.main.feels_like}°C</p>
            {/* <p>Rain: {data.rain["1h"]} mm </p> */}
            <p>Humidity: {data.main.humidity}%</p>
            <p>Pressure: {data.main.pressure} hPa</p>
            <p>Weather: {data.weather[0].description}</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
            <p>Clouds: {data.clouds.all}%</p>
            <p>
              Coordinates: {data.coord.lat}, {data.coord.lon}
            </p>
            <p>
              Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </>
        ) : error ? (
          <p className="error">{error}</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
