import { parseMockApi } from '@core/mock/mock.server';
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
  const slugs = await parseMockApi('/api/slugs');
  return slugs;
}
