import { getData } from '@core/data/data.service';
import { IEquatable } from '@core/entity/entity';
// import { parseMockApi } from '@core/mock/mock.server';
import { Product } from './product';

export async function getProducts(): Promise<Product[]> {
  const data = await getData();
  const products = await data.product.findMany();
  // const products = await parseMockApi(`/api/products`);
  // console.log('products ->', products.length);
  return products;
}

export async function getProduct(id: IEquatable): Promise<Product> {
  const data = await getData();
  const product = await data.product.findOne(id);
  // const product = await parseMockApi(`/api/product/${id}`);
  // console.log('product ->', product);
  return product;
}
