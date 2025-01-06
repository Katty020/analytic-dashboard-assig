import { WeatherResponse } from "./types"

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

export async function getWeatherForecast(latitude: number, longitude: number) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&apikey=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const data: WeatherResponse = await response.json()
    return data
  } catch (error) {
    console.error('Weather API error:', error)
    throw error
  }
}