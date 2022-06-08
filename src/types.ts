import type { IEntity, IQuerable } from "@core/entity/entity";
import type { ICategory } from "@models/category/category";
import type { IFeatureType } from "@models/feature_type/feature_type";
import type { ILabel } from "@models/label/label";
import type { ILocale } from "@models/locale/locale";
import type { IMarket } from "@models/market/market";
import type { IMenu } from "@models/menu/menu";
import type { IPage } from "@models/page/page";
import type { IProduct } from "@models/product/product";
import type { IRoute } from "@models/route/route";
import type { ITile } from "@models/tile/tile";
// import { ICategory, IFeatureType, ILabel, ILocale, IMarket, IMenu, IPage, IProduct, IRoute, ITile } from "./@models";

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
