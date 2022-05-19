import { getCachedStore } from '@core/store/store.service';
import { Menu } from './menu';

export async function getMenu(menu): Promise<Menu> {
  const store = await getCachedStore();
  const item: any = await store.menu.findOne(menu); // !!! any
  return item;
}

export async function getMenus(): Promise<Menu[]> {
  const store = await getCachedStore();
  const items: any[] = await store.menu.findMany(); // !!! any
  return items;
}
