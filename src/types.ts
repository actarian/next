import type { IEntity, IQuerable } from '@core/index';
import { ICategory, IFeatureType, ILabel, ILocale, IMarket, IMenu, IPage, IProduct, IRoute, ITile } from '@models/index';

/*
  * Here we define the mapping of the entities types to the physical templates in the pages/[market]/[locale] folder.
*/
export const PAGES = {
  homepage: 'homepage',
  about: 'about',
  product_index: 'product_index',
  product_search_csr: 'product_search_csr',
  product_search_ssr: 'product_search_ssr',
  product: 'product',
  notfound: 'notfound',
};

/*
  * Here we define the AppStore mapping of the entities types to the IQuerable services.
*/
export type AppStore = {
  about: IQuerable<any>;
  category: IQuerable<ICategory>;
  country: IQuerable<any>;
  homepage: IQuerable<any>;
  label: IQuerable<ILabel>;
  locale: IQuerable<ILocale>;
  market: IQuerable<IMarket>;
  menu: IQuerable<IMenu>;
  notfound: IQuerable<any>;
  page: IQuerable<IPage>;
  product_index: IQuerable<any>;
  product: IQuerable<IProduct>;
  tile: IQuerable<ITile>;
  feature_type: IQuerable<IFeatureType>;
  route: IQuerable<IRoute>;

  [key: string]: IQuerable<IEntity>;
}
