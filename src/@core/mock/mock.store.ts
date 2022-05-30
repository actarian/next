const path = require('path');

import { fsReadJson } from '@core/fs/fs.service';
import { AppStore } from 'src/types';
import MockService from './mock.service';

let STORE_: AppStore;

export async function getMockStore(): Promise<AppStore> {
  if (STORE_) {
    return STORE_;
  }
  // console.log('getMockStore');
  const pathname = path.join(process.cwd(), 'data', 'store', 'store.json');
  // const pathname = pathJoin('data', 'store', 'store.json'); // !!! not working
  const json = await fsReadJson(pathname);
  const store = {};
  Object.keys(json).forEach(key => {
    store[key] = new MockService<any>(json[key].items);
  });
  STORE_ = store as AppStore;
  return STORE_;
}
