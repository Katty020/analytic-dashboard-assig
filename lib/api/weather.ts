import { env } from "@/lib/env"

const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function getCurrentWeather(lat: number, lon: number) {
  if (!env.OPENWEATHER_API_KEY) {
    throw new Error('OpenWeather API key is not configured')
  }

  try {
    const res = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${env.OPENWEATHER_API_KEY}&units=metric`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    )
    
    if (!res.ok) {
      throw new Error(`Weather API returned ${res.status}`)
    }
    
    return res.json()
  } catch (error) {
    console.error('Weather API error:', error)
    return {
      main: { temp: 20, humidity: 50 },
      wind: { speed: 5 },
      weather: [{ description: 'No data available', icon: '01d' }]
    }
  }
}