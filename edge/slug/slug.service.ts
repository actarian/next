import { fetchApi } from '../fetchApi';

export async function getSlugs() {
  return await fetchApi('/api/slugs');
}
