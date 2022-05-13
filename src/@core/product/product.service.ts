import { parseMockApi } from '@core/mock/mock.server';
import { IEquatable } from 'types';
import { Product } from './product';

export async function getProducts(): Promise<Product[]> {
  const products = await parseMockApi(`/api/products`);
  return products;
}

export async function getProduct(id: IEquatable): Promise<Product> {
  const product = await parseMockApi(`/api/product/${id}`);
  return product;
}
