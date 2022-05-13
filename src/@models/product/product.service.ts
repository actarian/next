import { apiGet } from '@core/api/api.service';
import { IEquatable } from 'types';
import { Product } from './product';

export async function getProducts(): Promise<Product[]> {
  const products = await apiGet('/products');
  return products;
}

export async function getProduct(id: IEquatable): Promise<Product> {
  const product = await apiGet(`/product/${id}`);
  return product;
}
