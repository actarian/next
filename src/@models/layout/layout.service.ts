import { ILabel } from '@models/label/label';
import { ILocale } from '@models/locale/locale';
import { IMarket } from '@models/market/market';
import { store } from '@models/store';
import { ILayout } from './layout';

export async function getLayout(market?: string, locale?: string): Promise<ILayout | null> {
  // const store = await getStore();
  const markets: IMarket[] = await store.getMarkets({ locale });
  const locales: ILocale[] = await store.getLocales({ locale });
  const labels: ILabel[] = await store.getLabels({ locale });
  const tree = await store.getRouteLinkTree(market, locale);
  // console.log('getLayout', market, locale);
  return {
    markets,
    market,
    locales,
    locale,
    labels,
    tree,
  };
}
