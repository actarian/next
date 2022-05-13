import { apiGet } from '../api/api.service';

export async function getProducts() {
  const products = await apiGet('/products');
  return products;
}

export async function getProduct(id) {
  const product = await apiGet(`/product/${id}`);
  return product;
}
