import { IEntity, IQuerable } from "@core/entity/entity";
import { ICategory } from "@models/category/category";
import { IFeatureType } from "@models/feature_type/feature_type";
import { ILabel } from "@models/label/label";
import { ILocale } from "@models/locale/locale";
import { IMarket } from "@models/market/market";
import { IMenu } from "@models/menu/menu";
import { IPage } from "@models/page/page";
import { IProduct } from "@models/product/product";
import { IRoute } from "@models/route/route";
import { ITile } from "@models/tile/tile";

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
export const PAGES = {
  homepage: '/:marketId/:localeId/homepage/:pageId',
  about: '/:marketId/:localeId/about/:pageId',
  product_index: '/:marketId/:localeId/product_index/:pageId',
  product: '/:marketId/:localeId/product/:pageId',
  notfound: '/:marketId/:localeId/notfound/:pageId',
};
*/
