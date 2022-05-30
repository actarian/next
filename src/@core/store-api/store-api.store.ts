import { AppStore, PAGES } from 'src/types';
import StoreApiService from './store-api.service';

let STORE_: AppStore;

export async function getApiStore(): Promise<AppStore> {
  if (STORE_) {
    return STORE_;
  }
  // console.log('getApiStore');
  const store = {};
  const keys = Object.keys(PAGES);
  const routes = [...keys, 'page', 'route', 'country', 'label', 'locale', 'market', 'menu'];
  routes.forEach(key => {
    store[key] = new StoreApiService<any>(key);
  });
  STORE_ = store as AppStore;
  return STORE_;
}
