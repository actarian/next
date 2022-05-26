import { FindParams } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { IMarket } from './market';

export async function getMarkets(params: FindParams = {}): Promise<IMarket[]> {
  const store = await getStore();
  const items: any = await store.market.findMany(params); // !!! any
  return items;
}
