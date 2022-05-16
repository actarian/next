import { getData } from '@core/data/data.service';
import JsonService from '@core/entity/json.service';
import { fsExists, fsReadJson, fsWriteJson, pathJoin } from '@core/fs/fs.service';
import { Menu } from '@models/menu/menu';
import { Global } from './global';

export async function getGlobal(): Promise<Global> {
  const data = await getData();
  const menuService = await data.menu as JsonService<Menu>;
  const menu = await menuService.findMany();
  const timestamp = new Date().getTime();
  return {
    menu,
    timestamp,
  };
}

export async function getCachedGlobal(): Promise<Global> {
  const pathname = pathJoin('.cache', 'global.json');
  const exists = await fsExists(pathname);
  if (exists) {
    const cache = await fsReadJson(pathname);
    if (cache) {
      return cache;
    }
  }
  const global = await getGlobal();
  await fsWriteJson(pathname, global);
  return global;
}
