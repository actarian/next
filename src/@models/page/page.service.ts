import { IEquatable } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { Breadcrumb } from '@models/breadcrumb/breadcrumb';
import { getBreadcrumbFromCategoryTree } from '@models/breadcrumb/breadcrumb.service';
import { Category } from '@models/category/category';
import { getCategoryTree } from '@models/category/category.service';
import { Page } from './page';

export async function getPage(schema: string, id: IEquatable, market?: string, locale?: string): Promise<Page | null> {
  const store = await getStore();
  if (!store) {
    return null;
  }
  const page = store.page;
  if (!page) {
    return null;
  }
  const pages = await page.findMany({
    where: { schema, id },
    params: { locale }
  });
  if (!pages.length) {
    return null;
  }
  const item: any = pages[0]; // !!! any
  if (item) {
    item.market = market;
    item.locale = locale;
    const markets = await store.market.findMany({ params: { locale } });
    item.markets = markets;
    const locales = await store.locale.findMany({ params: { locale } });
    item.locales = locales;
    const header = await store.menu.findOne('header', { params: { locale } });
    item.header = header;
    const routes = await store.route.findMany({ where: { pageSchema: schema, pageId: id } });
    const href = routes.find(x => x.market === market && x.locale === locale);
    item.href = href;
    const alternate = routes.filter(x => x.market === market && x.locale !== locale);
    item.alternate = alternate;
    const categoryTree: Category[] = await getCategoryTree(item, { params: { locale } });
    const breadcrumb: Breadcrumb[] = await getBreadcrumbFromCategoryTree(categoryTree);
    item.breadcrumb = breadcrumb;
    return item;
  } else {
    console.log('PageService.getPage.notfound', schema, id, locale);
    return null;
  }
}
