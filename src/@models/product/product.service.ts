import { FindParams, IEquatable } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { awaitAll } from '@core/utils';
import { decorateHref } from '@models/route/route.service';
import { Product } from './product';

export async function getProducts(params: FindParams = {}): Promise<Product[]> {
  const store = await getStore();
  const products: any[] = await store.product.findMany(params); // !!! any
  // console.log('products ->', products.length);
  return await awaitAll(products, async (p) => await decorateHref(p, params.market, params.locale));
}

export async function getProduct(id: IEquatable, params: FindParams = {}): Promise<Product> {
  const store = await getStore();
  const product: any = await store.product.findOne({ where: { id }, market: params.market, locale: params.locale }); // !!! any
  // console.log('product ->', product);
  return await decorateHref(product, params.market, params.locale);
}
