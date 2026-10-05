export async function fetcher(url) {
  const host = process.env.NEXT_PUBLIC_API
  if (!host) {
    throw new Error("NEXT_PUBLIC_API environment variable is not defined")
  }

  const res = await fetch(`${host}${url}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }

  return res.json()
}
