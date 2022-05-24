const path = require('path');

import { IEntity } from '@core/entity/entity';
import { fsReadJson } from '@core/fs/fs.service';
import MockService from '@core/mock/mock.service';
import { Store } from '@core/store/store';

export async function getMockStore(): Promise<Store> {
  // console.log('getMockStore');
  const pathname = path.join(process.cwd(), 'data', 'store', 'store.json');
  // const pathname = pathJoin('data', 'store', 'store.json'); // !!! not working
  const json = await fsReadJson(pathname);
  const store: { [key: string]: MockService<IEntity> } = {};
  Object.keys(json).forEach(key => {
    store[key] = new MockService(json[key].items);
  });
  // console.log(store.route.collection);
  return store;
}
