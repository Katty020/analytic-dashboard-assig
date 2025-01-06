import { env } from "@/lib/env"

const BASE_URL = "https://www.alphavantage.co/query"

export async function getStockQuote(symbol: string) {
  const res = await fetch(
    `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${env.ALPHA_VANTAGE_API_KEY}`
  )
  
  if (!res.ok) throw new Error('Failed to fetch stock quote')
  
  return res.json()
}

export async function getStockTimeSeries(symbol: string) {
  const res = await fetch(
    `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${env.ALPHA_VANTAGE_API_KEY}`
  )
  
  if (!res.ok) throw new Error('Failed to fetch stock time series')
  
  return res.json()
}