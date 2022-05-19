import { getData } from '@core/data/data.service';
import { IEquatable } from '@core/entity/entity';
import { Page } from './page';

export async function getPageByCollectionAndId(collectionName: string, id: IEquatable): Promise<Page | null> {
  const data = await getData();
  if (!data) {
    return null;
  }
  const page = data.page;
  if (!page) {
    return null;
  }

  const category = data.category;
  if (!category) {
    return null;
  }

  const pages = await page.findMany(id);
  if (!pages) {
    return null;
  }
  const item = pages.find(x => x.schema === collectionName && x.id === id);
  if (item) {
    item.breadcrumb = await getBreadcrumb(item);
    return item;
  } else {
    console.log('PageService.getPageByCollectionAndId.notfound', collectionName, id);
    return null;
  }
}

export async function getPageByUrl(href): Promise<Page | null> {
  const data = await getData();
  if (!data) {
    return null;
  }
  const routes = await data.route.findMany();
  if (!routes) {
    return null;
  }
  const route = routes.find(x => x.href === href) || null;
  if (!route) {
    return null;
  }
  const collection = data[route.schema];
  if (!collection) {
    return null;
  }
  const item = await collection.findOne(route.id);
  return item || null;
}

export async function getBreadcrumb(page): Promise<any[]> { // !!! any
  const data = await getData();
  if (!data) {
    return [];
  }

  const category = data.category;
  if (!category) {
    return [];
  }

  const categories = await category.findMany();

  const breadcrumb = [];

  let categoryId = page.categoryId || null;
  let skipLast = false;
  while (categoryId !== null) {
    // console.log(categoryId);
    const c = categories.find(c => c.id === categoryId);
    if (c) {
      const b = { ...c };
      breadcrumb.unshift(b);
      categoryId = b.categoryId || null;
      if (
        b.schema === page.schema &&
        b.schemaId === page.id
      ) {
        skipLast = true;
      }
    } else {
      categoryId = null;
    }
  }

  if (!skipLast) {
    breadcrumb.push({
      id: null,
      title: page.title,
      slug: page.slug,
      schema: page.schema,
      schemaId: page.id,
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

export async function resolveHref(page): Promise<string> {
  const breadcrumb = await getBreadcrumb(page);
  const href = breadcrumb.length > 0 ? breadcrumb.pop().href : '';
  // console.log('resolveHref', href);
  return href;
}

export async function getPageByCollectionAndId_2(collectionName: string, id: IEquatable): Promise<Page | null> {
  const data = await getData();
  if (!data) {
    return null;
  }
  const collection = data[collectionName];
  if (!collection) {
    return null;
  }
  const item = await collection.findOne(id);
  return item || null;
}
