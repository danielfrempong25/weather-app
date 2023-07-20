import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1462d918a1a6330a2e048e17cc45c743&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
        setWeatherData(null);
      }
    };

    if (city) {
      fetchData();
    }
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="bg-cyan-200 min-h-screen flex items-center justify-center">
      <div className="bg-cyan-300 p-8 h-[350px] w-[350px] rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
          className="border border-gray-300 rounded px-4 py-2 mb-4"
        />
        {weatherData && (
          <>
            <h2 className="text-lg font-semibold mb-2">
              Weather in {weatherData.name}
            </h2>
            <p className="text-gray-600">
              Temperature: {weatherData.main.temp}°C
            </p>
            <p className="text-gray-600">
              Description: {weatherData.weather[0].description}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
