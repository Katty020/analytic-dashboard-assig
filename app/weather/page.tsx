"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Coordinates {
  lat: number;
  lon: number;
}

interface WeatherInfo {
  name: string;
  sys: { country: string };
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  clouds: { all: number };
}

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

const WeatherApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'user' | 'search'>('user');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedCoordinates = sessionStorage.getItem("user-coordinates");
    if (savedCoordinates) {
      setCoordinates(JSON.parse(savedCoordinates));
    }
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherByCoordinates(coordinates);
    }
  }, [coordinates]);

  const switchTab = (tab: 'user' | 'search') => {
    setCurrentTab(tab);
    if (tab === 'user' && !coordinates) {
      setWeatherInfo(null);
    }
  };

  const fetchWeatherByCoordinates = async (coords: Coordinates) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      setWeatherInfo(data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      setWeatherInfo(data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userCoordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
        setCoordinates(userCoordinates);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col items-center">
      <motion.h1 
        className="text-4xl font-bold mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Weather Information
      </motion.h1>
      <div className="flex mt-10 space-x-4">
        <motion.button
          onClick={() => switchTab('user')}
          className={`px-4 py-2 rounded ${currentTab === 'user' ? 'bg-blue-500' : 'bg-gray-500'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Your Weather
        </motion.button>
        <motion.button
          onClick={() => switchTab('search')}
          className={`px-4 py-2 rounded ${currentTab === 'search' ? 'bg-blue-500' : 'bg-gray-500'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Search Weather
        </motion.button>
      </div>

      <div className="mt-10">
        {currentTab === 'user' && (
          <>
            {!coordinates ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image src="/assets/location.png" alt="location" width={80} height={80} className="mb-4" />
                <p className="text-lg font-semibold">Grant Location Access</p>
                <p className="text-sm text-gray-300">Allow access to get weather information</p>
                <button onClick={getLocation} className="mt-4 px-4 py-2 bg-blue-500 rounded">
                  Grant Access
                </button>
              </motion.div>
            ) : loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image src="/assets/loading.gif" alt="loading" width={160} height={160} />
                <p>Loading...</p>
              </motion.div>
            ) : (
              weatherInfo && <WeatherDetails weatherInfo={weatherInfo as WeatherInfo} />
            )}
          </>
        )}

        {currentTab === 'search' && (
          <>
            <motion.form
              onSubmit={(e) => {
                e.preventDefault();
                fetchWeatherByCity(searchQuery);
              }}
              className="flex items-center mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-l bg-white text-black"
                placeholder="Search for City..."
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 rounded-r">
                Search
              </button>
            </motion.form>
            {loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image src="/assets/loading.gif" alt="loading" width={160} height={160} />
                <p>Loading...</p>
              </motion.div>
            ) : (
              weatherInfo && <WeatherDetails weatherInfo={weatherInfo as WeatherInfo} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const WeatherDetails: React.FC<{ weatherInfo: WeatherInfo }> = ({ weatherInfo }) => {
  return (
    <motion.div 
      className="flex flex-col items-center mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <p className="text-2xl font-semibold">{weatherInfo.name}</p>
        <Image
          src={`https://flagcdn.com/144x108/${weatherInfo.sys.country.toLowerCase()}.png`}
          alt="country flag"
          width={32}
          height={24}
          className="w-8 h-8"
        />
      </div>
      <Image
        src={`http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`}
        alt="weather icon"
        width={80}
        height={80}
      />
      <p className="text-4xl font-bold">{weatherInfo.main.temp} °C</p>
      <div className="flex space-x-4 mt-4">
        <div className="flex flex-col items-center">
          <p>Windspeed</p>
          <p>{weatherInfo.wind.speed} m/s</p>
        </div>
        <div className="flex flex-col items-center">
          <p>Humidity</p>
          <p>{weatherInfo.main.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <p>Clouds</p>
          <p>{weatherInfo.clouds.all}%</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherApp;
