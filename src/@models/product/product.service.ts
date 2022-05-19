import { IEquatable } from '@core/entity/entity';
import { getCachedStore } from '@core/store/store.service';
import { awaitAll } from '@core/utils';
import { decorateHref } from '@models/breadcrumb/breadcrumb.service';
import { Product } from './product';

export async function getProducts(): Promise<Product[]> {
  const store = await getCachedStore();
  const products: any[] = await store.product.findMany(); // !!! any
  // console.log('products ->', products.length);
  return await awaitAll(products, async (p) => await decorateHref(p));
}

export async function getProduct(id: IEquatable): Promise<Product> {
  const store = await getCachedStore();
  const product: any = await store.product.findOne(id); // !!! any
  // console.log('product ->', product);
  return await decorateHref(product);
}
