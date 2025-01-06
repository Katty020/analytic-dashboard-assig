"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface StockCardProps {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export function StockCard({
  symbol,
  price,
  change,
  changePercent,
}: StockCardProps) {
  const isPositive = change >= 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>{symbol}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <p className="text-2xl font-bold">${price.toFixed(2)}</p>
          <div className="flex items-center gap-2">
            {isPositive ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500" />
            )}
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}