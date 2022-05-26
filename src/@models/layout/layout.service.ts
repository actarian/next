import { Locale } from '@models/locale/locale';
import { Market } from '@models/market/market';
import { store } from '@models/store';
import { Layout } from './layout';

export async function getLayout(market?: string, locale?: string): Promise<Layout | null> {
  // const store = await getStore();
  const markets: Market[] = await store.getMarkets({ where: {locale } });
  const locales: Locale[] = await store.getLocales({ where: {locale} });
  const tree = await store.getRouteLinkTree(market, locale);
  // console.log('getLayout', market, locale);
  return {
    markets,
    market,
    locales,
    locale,
    tree,
  };
}
