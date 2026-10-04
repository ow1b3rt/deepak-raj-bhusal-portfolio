export async function fetcher(url) {
  const host = process.env.NEXT_PUBLIC_API
  if (!host) {
    throw new Error('NEXT_PUBLIC_API environment variable is not defined');
  }
  return await fetch(`${host}${url}`).then((res) => res.json());
}
