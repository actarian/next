import { parseMockApi } from '../resolve-mock-api';

export async function getSlugs() {
  const slugs = await parseMockApi('/api/slugs');
  return slugs;
}
