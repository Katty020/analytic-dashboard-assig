"use client";

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const API_URL = 'https://www.alphavantage.co/query';
const API_KEY = '9YOUD22Z2R5LXL1U';

interface StockData {
  symbol: string;
  price: string;
  open: string;
  high: string;
  low: string;
  changePercent: string;
  volume: string;
}

const StockMarket: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [stock, setStock] = useState<StockData | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (stock) {
      fetchHistoricalData(stock.symbol);
    }
  }, [stock]);

  const fetchStockData = async (symbol: string) => {
    setLoading(true);
    setError(null);
    setStock(null);
    setHistoricalData([]);

    try {
      const response = await fetch(`${API_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
      const result = await response.json();

      if (result['Error Message']) {
        throw new Error('Invalid symbol or API error');
      }

      const timeSeries = result['Time Series (5min)'];
      const latestTime = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTime];

      setStock({
        symbol: result['Meta Data']['2. Symbol'],
        price: latestData['4. close'],
        open: latestData['1. open'],
        high: latestData['2. high'],
        low: latestData['3. low'],
        changePercent: result['Meta Data']['10. Change Percent'] || 'N/A',
        volume: latestData['5. volume'],
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async (symbol: string) => {
    try {
      const response = await fetch(`${API_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
      const result = await response.json();

      if (result['Error Message']) {
        throw new Error('Invalid symbol or API error');
      }

      const timeSeries = result['Time Series (Daily)'];
      const chartData = Object.keys(timeSeries).map(date => ({
        date,
        close: timeSeries[date]['4. close'],
      })).reverse();

      setHistoricalData(chartData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  const handleSearch = () => {
    if (query) {
      fetchStockData(query);
    }
  };

  const chartData = {
    labels: historicalData.map(data => data.date),
    datasets: [
      {
        label: `${stock?.symbol} Stock Price`,
        data: historicalData.map(data => data.close),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      }
    ]
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} transition-colors duration-500`}>
      <header className={`p-4 text-center ${darkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white flex justify-between items-center`}>
        <h1 className="text-2xl font-bold">Real-Time Stock Market</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-2 bg-gray-700 text-white p-2 rounded hover:bg-gray-600 flex items-center justify-center transition-colors duration-300"
        >
          {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
           {darkMode ? 'Light' : 'Dark'}
        </button>
      </header>
      <main className="p-6">
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Enter stock symbol"
            className={`p-2 border rounded w-full md:w-1/3 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} transition-colors duration-300`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Search
          </button>
        </div>
        {loading && <div className="text-center text-xl animate-pulse">Loading...</div>}
        {error && <div className="text-center text-xl text-red-600">{error}</div>}
        {stock && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`shadow-md rounded p-4 max-w-md mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}
          >
            <h2 className="text-xl font-bold text-blue-600">{stock.symbol}</h2>
            <p className="text-lg text-green-600">Price: ${stock.price}</p>
            <p className="text-lg text-yellow-600">Open: ${stock.open}</p>
            <p className="text-lg text-red-600">High: ${stock.high}</p>
            <p className="text-lg text-purple-600">Low: ${stock.low}</p>
            <p className="text-lg text-orange-600">Volume: {stock.volume}</p>
            <p className="text-lg text-blue-400">Change Percent: {stock.changePercent}</p>
          </motion.div>
        )}
        {historicalData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Line data={chartData} />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default StockMarket;
