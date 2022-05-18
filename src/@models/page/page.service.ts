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
  const pages = await page.findMany(id);
  if (!pages) {
    return null;
  }
  const item = pages.find(x => x.schema === collectionName && x.id === id);
  return item || null;
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

export async function getPageBySlug(slug): Promise<Page | null> {
  const data = await getData();
  if (!data) {
    return null;
  }
  const slugs = await data.slug.findMany();
  if (!slugs) {
    return null;
  }
  const route = slugs.find(x => x.slug === slug) || null;
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
