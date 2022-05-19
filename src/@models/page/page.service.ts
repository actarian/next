import { IEquatable, IQuerable } from '@core/entity/entity';
import { getCachedStore } from '@core/store/store.service';
import { Breadcrumb, IBreadcrumb } from '@models/breadcrumb/breadcrumb';
import { ICategorized } from '@models/category/category';
import { Page } from './page';

export async function getPageByCollectionAndId(collectionName: string, id: IEquatable): Promise<Page | null> {
  const store = await getCachedStore();
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
  const store = await getCachedStore();
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

export async function getBreadcrumb(item: ICategorized, injectedStore?: { [key: string]: IQuerable<any> }): Promise<Breadcrumb[]> { // !!! any
  const store = injectedStore || (await getCachedStore());
  if (!store) {
    return [];
  }

  const category = store.category;
  if (!category) {
    return [];
  }

  const categories = await category.findMany();

  const breadcrumb: IBreadcrumb[] = [];

  let categoryId = item.categoryId || null;
  let skipLast = false;
  while (categoryId !== null) {
    // console.log(categoryId);
    const c = categories.find(c => c.id === categoryId);
    if (c) {
      const b = { ...c };
      breadcrumb.unshift(b);
      categoryId = b.categoryId || null;
      if (
        b.schema === item.schema &&
        b.schemaId === item.id
      ) {
        skipLast = true;
      }
    } else {
      categoryId = null;
    }
  }

  if (!skipLast) {
    breadcrumb.push({
      title: item.title,
      slug: item.slug,
      schema: item.schema,
      schemaId: item.id,
      categoryId: 0,
    });
  }

  breadcrumb.reduce((p, c, i) => {
    const href = `${p}/${c.slug}`;
    c.href = href;
    return href === '/' ? '' : href;
  }, '');

  // console.log('getBreadcrumb.breadcrumb', breadcrumb);

  return breadcrumb;
}

export async function resolveHref(item: ICategorized, injectedStore?: { [key: string]: IQuerable<any> }): Promise<string> {
  const breadcrumb = await getBreadcrumb(item, injectedStore);
  const href = breadcrumb.length > 0 ? breadcrumb.pop().href : '';
  // console.log('resolveHref', href);
  return href;
}

export async function decorateHref(item: any): Promise<any> {
  const href = await resolveHref(item);
  return { ...item, href };
}

export async function getPageByCollectionAndId_2(collectionName: string, id: IEquatable): Promise<Page | null> {
  const store = await getCachedStore();
  if (!store) {
    return null;
  }
  const collection = store[collectionName];
  if (!collection) {
    return null;
  }
  const item: any = await collection.findOne(id); // !!! any
  return item || null;
}
