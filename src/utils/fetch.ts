function buildURL(pathname: string) {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${pathname}`
  }

  return `http://localhost:${
    process.env.NEXT_PUBLIC_API_PORT || 3000
  }${pathname}`
}

export async function request(url: string, options?: RequestInit) {
  const res = await fetch(buildURL(url), {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return res.json()
}
