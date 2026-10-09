export async function mediaFetcher(layout = 'gallery') {
  if (!layout) return null;
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "/layouts/" + layout, {
      cache: "no-store",
    });
    const data = res?.ok ? await res.json() : null;
    return data ? data.layout : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetcher(url, options = {}) {
  const res = await fetch(process.env.NEXT_PUBLIC_API + url, {
    credentials: "include",
    ...options,
  });
  return res.ok ? await res.json() : null;
}

