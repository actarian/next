import { parseMockApi } from '../resolve-mock-api';

export async function getMenu(menu) {
  const slugs = await parseMockApi(`/api/menu/${menu}`);
  return slugs;
}
