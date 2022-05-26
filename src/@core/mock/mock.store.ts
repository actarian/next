const path = require('path');

import { fsReadJson } from '@core/fs/fs.service';
import { AppStore } from 'src/entities';
import MockService from './mock.service';

export async function getMockStore(): Promise<AppStore> {
  console.log('getMockStore');
  const pathname = path.join(process.cwd(), 'data', 'store', 'store.json');
  // const pathname = pathJoin('data', 'store', 'store.json'); // !!! not working
  const json = await fsReadJson(pathname);
  const store = {};
  Object.keys(json).forEach(key => {
    store[key] = new MockService<any>(json[key].items);
  });
  // console.log(store.route.collection);
  return store as AppStore;
}
