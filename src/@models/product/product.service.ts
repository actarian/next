import { getData } from '@core/data/data.service';
import { IEquatable } from '@core/entity/entity';
import { awaitAll } from '@core/utils';
import { resolveHref } from '@models/page/page.service';
// import { parseMockApi } from '@core/mock/mock.server';
import { Product } from './product';

export async function getProducts(): Promise<Product[]> {
  const data = await getData();
  const products = await data.product.findMany();
  // console.log('products ->', products.length);
  return await awaitAll(products, async (p) => await decorateHref(p));
}

export async function getProduct(id: IEquatable): Promise<Product> {
  const data = await getData();
  const product = await data.product.findOne(id);
  // const product = await parseMockApi(`/api/product/${id}`);
  // console.log('product ->', product);
  return await decorateHref(product);
}

export async function decorateHref(item: any): Promise<any> {
  const href = await resolveHref(item);
  return { ...item, href };
}
