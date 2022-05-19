import { fsExistOrCreateFolder, fsExists, fsReadJson, fsWriteJson, pathJoin } from '@core/fs/fs.service';
import { getMenus } from '@models/menu/menu.service';
import { Global } from './global';

export async function getGlobal(): Promise<Global> {
  const menu = await getMenus();
  const timestamp = new Date().getTime();
  return {
    menu,
    timestamp,
  };
}

export async function getCachedGlobal(): Promise<Global> {
  const cacheDirectory = pathJoin('.cache');
  await fsExistOrCreateFolder(cacheDirectory);
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
