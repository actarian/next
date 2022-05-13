
export async function fetchApi(url: string) {
  const fetchResponse = await fetch(`http:/localhost:3000${url}`, { method: 'GET' });
  const data = await fetchResponse.json();
  return data;
}
