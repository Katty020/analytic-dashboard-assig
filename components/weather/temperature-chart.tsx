"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherData } from "@/lib/api/weather/types"

interface TemperatureChartProps {
  data: WeatherData[]
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  const formattedData = data.map(item => ({
    time: new Date(item.time).toLocaleTimeString([], { hour: '2-digit' }),
    temperature: item.temperature
  }))

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>24-Hour Temperature Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
              <XAxis 
                dataKey="time" 
                tickLine={false}
                tickFormatter={(value) => value}
              />
              <YAxis 
                tickLine={false}
                tickFormatter={(value) => `${value}°C`}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Time
                            </span>
                            <span className="font-bold">
                              {payload[0].payload.time}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°C
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                strokeWidth={2}
                activeDot={{
                  r: 4,
                  style: { fill: "var(--theme-primary)" }
                }}
                style={{
                  stroke: "var(--theme-primary)"
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}