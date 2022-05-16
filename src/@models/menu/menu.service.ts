import { getData } from '@core/data/data.service';
import { Menu } from './menu';

export async function getMenu(menu): Promise<Menu> {
  const data = await getData();
  const item = await data.menu.findOne(menu);
  return item;
}
