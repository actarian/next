import { StoreStrategy, storeStrategy } from '@core/utils';
import { getCategories } from './category/category.service';
import { getLayout } from './layout/layout.service';
import { getLocales } from './locale/locale.service';
import { getMarkets } from './market/market.service';
import { getMenu, getMenus } from './menu/menu.service';
import { getPage, getPageLayout } from './page/page.service';
import { getProduct, getProducts } from './product/product.service';
import { decorateHref, getRoute, getRouteLinkTree, getRoutes, getStaticPathsForSchema } from './route/route.service';

export const store = storeStrategy === StoreStrategy.Api ? {
  getCategories,
  getLayout,
  getLocales,
  getMarkets,
  getMenus,
  getMenu,
  getPage,
  getPageLayout,
  getProducts,
  getProduct,
  getRoutes,
  getRoute,
  getRouteLinkTree,
  getStaticPathsForSchema,
  decorateHref,
} : (storeStrategy === StoreStrategy.Mock ? {
  getCategories,
  getLayout,
  getLocales,
  getMarkets,
  getMenus,
  getMenu,
  getPage,
  getPageLayout,
  getProducts,
  getProduct,
  getRoutes,
  getRoute,
  getRouteLinkTree,
  getStaticPathsForSchema,
  decorateHref,
} : {});
