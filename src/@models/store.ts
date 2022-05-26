
import { getCategories } from './category/category.service';
import { getLabels, resolveLabel } from './label/label.service';
import { getLayout } from './layout/layout.service';
import { getLocales, localizedToString, localizeItem, localizeValue } from './locale/locale.service';
import { getMarkets } from './market/market.service';
import { getMenu, getMenus } from './menu/menu.service';
import { getErrorPageLayout, getPage, getPageLayout } from './page/page.service';
import { getProduct, getProducts } from './product/product.service';
import { decorateHref, getRoute, getRouteLinkTree, getRoutes, getStaticPathsForSchema } from './route/route.service';

const mockStore = {
  getCategories,
  getLabels,
  resolveLabel,
  getLayout,
  getLocales,
  localizeItem,
  localizeValue,
  localizedToString,
  getMarkets,
  getMenu,
  getMenus,
  getPage,
  getPageLayout,
  getErrorPageLayout,
  getProduct,
  getProducts,
  getRoute,
  getRoutes,
  getRouteLinkTree,
  getStaticPathsForSchema,
  decorateHref,
};

const apiStore = mockStore;

const dataStore = mockStore;

export enum StoreStrategy {
  Api = 'api',
  Data = 'data',
  Mock = 'mock',
};

export const storeStrategy: StoreStrategy = getStoreStrategy();

export const store = storeStrategy === StoreStrategy.Api ? apiStore : (storeStrategy === StoreStrategy.Mock ? mockStore : dataStore);

function getStoreStrategy(): StoreStrategy {
  let storeStrategy = StoreStrategy.Mock;
  if (process && process.env.STORE_STRATEGY) {
    storeStrategy = process.env.STORE_STRATEGY as StoreStrategy;
  }
  return storeStrategy;
}
