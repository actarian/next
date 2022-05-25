import { getStore } from '@core/store/store.service';
import { Locale } from '@models/locale/locale';
import { Market } from '@models/market/market';
import { getRouteLinkTree } from '@models/route/route.service';
import { Layout } from './layout';

export async function getLayout(market?: string, locale?: string): Promise<Layout | null> {
  const store = await getStore();
  const markets: Market[] = await store.market.findMany({ locale });
  const locales: Locale[] = await store.locale.findMany({ locale });
  const tree = await getRouteLinkTree(market, locale);
  // console.log('getLayout', market, locale);
  return {
    markets,
    market,
    locales,
    locale,
    tree,
  };
}
