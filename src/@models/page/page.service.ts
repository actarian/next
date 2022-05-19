import { IEquatable } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { getBreadcrumb } from '@models/breadcrumb/breadcrumb.service';
import { Page } from './page';

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

export async function getPageByUrl(href): Promise<Page | null> {
  const store = await getStore();
  if (!store) {
    return null;
  }
  const routes = await store.route.findMany();
  if (!routes) {
    return null;
  }
  const route = routes.find(x => x.href === href) || null;
  if (!route) {
    return null;
  }
  const collection = store[route.schema];
  if (!collection) {
    return null;
  }
  const item: any = await collection.findOne(route.id); // !!! any
  return item || null;
}
