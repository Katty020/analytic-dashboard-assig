"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="h-full relative bg-gray-50 dark:bg-gray-900">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-800">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Header />
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between space-y-2"
          >
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome to Your Dashboard
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8"
          >
            {/* Feature Card 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Real-Time Stock Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stay updated with the latest stock market trends, prices, and analysis.
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Latest Weather Data
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get real-time weather updates including temperature, humidity, and forecasts.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                News Updates on All Topics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore the latest news on IPL, politics, entertainment, and more.
              </p>
            </motion.div>

            {/* More Feature Cards */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Personalized Notifications
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive tailored updates and alerts based on your interests and preferences.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Interactive Charts & Graphs
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Visualize data trends with interactive line charts, bar graphs, and more.
              </p>
            </motion.div>
          </motion.div>

          {/* Content Section with Animations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-16 bg-white dark:bg-gray-700 shadow-md rounded-lg p-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
              Explore More Features
            </h3>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              In addition to stock information, weather data, and news updates, our app offers various other features to enhance your experience. Whether you need personalized notifications, interactive charts, or a user-friendly dashboard, we have it all.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
