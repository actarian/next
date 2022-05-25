import { FindParams } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { Market } from './market';

export async function getMarkets(params: FindParams = {}): Promise<Market[]> {
  const store = await getStore();
  const items: any = await store.market.findMany(params); // !!! any
  return items;
}
