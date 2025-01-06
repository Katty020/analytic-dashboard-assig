"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const API_URL = "https://newsdata.io/api/1/news?apikey=pub_2501573d5a66fa29132ca8fa301fb38bbf7cc&q=";

interface Article {
  image_url: string;
  title: string;
  description: string;
  source_id: string;
  pubDate: string;
  link: string;
}

const NewsApp: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState('');
  const [currentNav, setCurrentNav] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchNews('online');
  }, []);

  const fetchNews = async (query: string) => {
    try {
      const response = await fetch(`${API_URL}${query}`);
      const data = await response.json();
      setArticles(data.results || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleNavClick = (category: string) => {
    setCurrentNav(category);
    fetchNews(category);
  };

  const handleSearch = () => {
    if (query) fetchNews(query);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-400 to-purple-500 text-black'} transition-colors duration-500`}>
      <nav className={`fixed top-0 w-full ${isDarkMode ? 'bg-gray-800' : 'bg-blue-500'} text-white flex justify-between items-center p-4 transition-colors duration-500 shadow-lg`}>
        <ul className="hidden sm:flex space-x-4">
          {['IPL', 'Breaking news', 'Politics'].map((category) => (
            <li
              key={category}
              className={`cursor-pointer ${currentNav === category ? 'font-bold' : ''} hover:underline`}
              onClick={() => handleNavClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSearch} className="bg-blue-700 px-4 py-2 rounded text-white hover:bg-blue-600 transition-colors duration-300">
            Search
          </button>
          <button
            onClick={toggleTheme}
            className="mt-2 bg-gray-700 text-white p-2 rounded hover:bg-gray-600 flex items-center justify-center transition-colors duration-300"
          >
            {isDarkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
            {isDarkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>

      <main className="pt-20 px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              className={`border rounded overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-transform transform hover:scale-105 duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Image src={article.image_url || "https://via.placeholder.com/400x200"} alt="News" width={400} height={200} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{article.title}</h3>
                <p className="text-sm my-2">{article.description}</p>
                <p className="text-sm">{`${article.source_id} : ${new Date(article.pubDate).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })}`}</p>
                <button onClick={() => window.open(article.link, "_blank")} className="mt-2 text-blue-500 underline">
                  Read more
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewsApp;
