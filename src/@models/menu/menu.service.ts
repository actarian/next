import { getData } from '@core/data/data.service';
import { Menu } from './menu';

export async function getMenu(menu): Promise<Menu> {
  const data = await getData();
  const item = await data.menu.findOne(menu);
  return item;
}

export async function getMenus(): Promise<Menu[]> {
  const data = await getData();
  const items = await data.menu.findMany();
  return items;
}
