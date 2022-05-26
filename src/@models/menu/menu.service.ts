import { IEquatable } from '@core/entity/entity';
import { getStore } from '@core/store/store.service';
import { IMenu } from './menu';

export async function getMenu(id: IEquatable): Promise<IMenu> {
  const store = await getStore();
  const item: any = await store.menu.findOne(id); // !!! any
  return item;
}

export async function getMenus(): Promise<IMenu[]> {
  const store = await getStore();
  const items: any[] = await store.menu.findMany(); // !!! any
  return items;
}
