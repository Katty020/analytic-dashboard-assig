"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Droplets, Sun, Wind } from "lucide-react"

interface WeatherCardProps {
  temp: number
  humidity: number
  windSpeed: number
  description: string
  icon: string
}

export function WeatherCard({ temp, humidity, windSpeed, description, icon }: WeatherCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon.includes("clear") ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Cloud className="h-5 w-5 text-blue-500" />
          )}
          Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{Math.round(temp)}°C</p>
            <p className="text-sm text-muted-foreground capitalize">{description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{windSpeed} m/s</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}