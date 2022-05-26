import { IEquatable } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { Category } from '@models/category/category';
import { getCategoryTree } from '@models/category/category.service';
import { RouteLink } from '@models/route/route';
import { getBreadcrumbFromCategoryTree } from '@models/route/route.service';
import { store } from '@models/store';
import { Page, PageLayout } from './page';

export async function getPage(schema: string, id: IEquatable, market?: string, locale?: string): Promise<Page | null> {
  const store = await getStore();
  const page = await store.page.findOne({ where: { schema, id }, market, locale }) as any;
  // console.log(page, market, locale);
  if (page) {
    const routes = await store.route.findMany({ where: { pageSchema: schema, pageId: id } });
    const currentRoute = routes.find(x => x.market === market && x.locale === locale);
    const alternates = routes.filter(x => x.market === market && x.locale !== locale);
    const categoryTree: Category[] = await getCategoryTree(page);
    const breadcrumb: RouteLink[] = await getBreadcrumbFromCategoryTree(categoryTree, market, locale);
    return {
      ...page,
      href: currentRoute.href, // !!! route?
      alternates,
      breadcrumb: breadcrumb,
    };
  } else {
    console.log('PageService.getPage.notfound', schema, id, locale);
    return null;
  }
}

export async function getPageLayout(schema: string, id: IEquatable, market?: string, locale?: string): Promise<PageLayout | null> {
  const page = await getPage(schema, id, market, locale);
  if (page) {
    const layout = await store.getLayout(market, locale);
    return {
      ...page,
      ...layout,
    };
  } else {
    return null;
  }
}
