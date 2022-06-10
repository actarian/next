import type { AppStore } from '@config';
import type { IEntity, IQuerable } from '@core';
import { fsReadJson } from '@core/fs/fs.service';
import MockService from './mock.service';

const path = require('path');

let STORE_: AppStore;

export async function getMockStore(): Promise<AppStore> {
  if (STORE_) {
    return STORE_;
  }
  // console.log('getMockStore');
  const pathname = path.join(process.cwd(), 'data', 'store', 'store.json');
  // const pathname = pathJoin('data', 'store', 'store.json'); // !!! not working
  const json = await fsReadJson(pathname);
  const store: { [key: string]: IQuerable<IEntity> } = {};
  if (json != null) {
    Object.keys(json).forEach(key => {
      store[key] = new MockService<any>(json[key].items);
    });
  }
  STORE_ = store as AppStore;
  return STORE_;
}
