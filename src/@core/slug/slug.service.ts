import { getData } from '@core/data/data.service';
// import { parseMockApi } from '@core/mock/mock.server';
import { Slug } from './slug';

const CACHE: { [key: string]: Slug[] } = {};

export async function getCachedSlugs(): Promise<Slug[]> {
  if (CACHE.slugs) {
    return CACHE.slugs;
  }
  const slugs = await getSlugs();
  CACHE.slugs = slugs;
  return slugs;
}

export async function getSlugs(): Promise<Slug[]> {
  const data = await getData();
  const slugs = await data.slug.findMany();
  // const slugs = await parseMockApi('/api/slugs');
  return slugs;
}

export async function getSlug(slug): Promise<Slug | null> {
  const data = await getData();
  const slugs = await data.slug.findMany();
  const item = slugs.find(x => x.slug === slug);
  return item || null;
  // const slugs = await parseMockApi('/api/slugs');
  // return slugs;
}
