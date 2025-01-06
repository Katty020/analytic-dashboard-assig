import { WeatherResponse, WeatherData } from "./types"

export function parseWeatherData(data: WeatherResponse): WeatherData[] {
  return data.hourly.time.map((time, index) => ({
    time,
    temperature: data.hourly.temperature_2m[index],
    unit: data.hourly_units.temperature_2m
  }))
}