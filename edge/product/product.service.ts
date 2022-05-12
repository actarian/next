import { fetchApi } from '../fetchApi';

export async function getProducts() {
  return await fetchApi('/api/products');
}
