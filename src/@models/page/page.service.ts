import { IEquatable } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { Category } from '@models/category/category';
import { getCategoryTree } from '@models/category/category.service';
import { RouteLink } from '@models/route/route';
import { getBreadcrumbFromCategoryTree, getRouteLinkTree } from '@models/route/route.service';
import { PageFull } from './page';

export async function getPage(schema: string, id: IEquatable, market?: string, locale?: string): Promise<PageFull | null> {
  const store = await getStore();
  const page = await store.page.findOne({ where: { schema, id }, market, locale }) as any;
  // console.log(page, market, locale);
  if (page) {
    page.market = market;
    page.locale = locale;
    const markets = await store.market.findMany({ locale });
    page.markets = markets;
    const locales = await store.locale.findMany({ locale });
    page.locales = locales;
    const tree = await getRouteLinkTree(market, locale);
    page.tree = tree;
    /*
    const header = await store.menu.findOne({ where: { id: 'header' }, locale });
    page.header = header;
    */
    const routes = await store.route.findMany({ where: { pageSchema: schema, pageId: id } });
    const currentRoute = routes.find(x => x.market === market && x.locale === locale);
    page.href = currentRoute.href;
    const alternateRoutes = routes.filter(x => x.market === market && x.locale !== locale);
    page.alternates = alternateRoutes;
    const categoryTree: Category[] = await getCategoryTree(page, { locale });
    const breadcrumb: RouteLink[] = await getBreadcrumbFromCategoryTree(categoryTree);
    page.breadcrumb = breadcrumb;
    return page;
  } else {
    console.log('PageService.getPage.notfound', schema, id, locale);
    return null;
  }
}
