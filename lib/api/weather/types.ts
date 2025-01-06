export interface WeatherResponse {
  hourly: {
    time: string[]
    temperature_2m: number[]
  }
  hourly_units: {
    temperature_2m: string
  }
}

export interface WeatherData {
  time: string
  temperature: number
  unit: string
}