const BASE_URL = "https://newsdata.io/api/1/news"

export async function getTopNews(query: string) {
  const url = new URL(BASE_URL)
  url.searchParams.append("apikey", "pub_2501573d5a66fa29132ca8fa301fb38bbf7cc")
  url.searchParams.append("q", query)

  const res = await fetch(url.toString())
  
  if (!res.ok) throw new Error('Failed to fetch news')
  
  return res.json()
}
