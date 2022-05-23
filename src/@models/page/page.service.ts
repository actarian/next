import { IEquatable } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { getBreadcrumb } from '@models/breadcrumb/breadcrumb.service';
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
    const header = await store.menu.findOne('header');
    item.header = header;
    const routes = await store.route.findMany({ where: { pageSchema: schema, pageId: id } });
    const alternate = routes.filter(x => x.locale !== locale);
    item.alternate = alternate;
    item.breadcrumb = await getBreadcrumb(item);
    return item;
  } else {
    console.log('PageService.getPageByCollectionAndId.notfound', schema, id, locale);
    return null;
  }
}

export async function getPageByCollectionAndId(collectionName: string, id: IEquatable): Promise<Page | null> {
  const store = await getStore();
  if (!store) {
    return null;
  }
  const page = store.page;
  if (!page) {
    return null;
  }
  const category = store.category;
  if (!category) {
    return null;
  }
  const pages = await page.findMany();
  if (!pages) {
    return null;
  }
  const item: any = pages.find(x => x.schema === collectionName && x.id === id); // !!! any
  if (item) {
    item.breadcrumb = await getBreadcrumb(item);
    return item;
  } else {
    console.log('PageService.getPageByCollectionAndId.notfound', collectionName, id);
    return null;
  }
}
