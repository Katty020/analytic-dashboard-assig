"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"

interface NewsCardProps {
  title: string
  description: string
  imageUrl: string
  publishedAt: string
  source: string
  url: string
}

export function NewsCard({
  title,
  description,
  imageUrl,
  publishedAt,
  source,
  url,
}: NewsCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{source}</span>
          <time>{formatDistanceToNow(new Date(publishedAt))} ago</time>
        </div>
      </CardContent>
    </Card>
  )
}