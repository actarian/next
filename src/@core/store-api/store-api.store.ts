import { AppStore } from 'types';
import StoreApiService from './store-api.service';

let STORE_: AppStore;

export async function getApiStore(): Promise<AppStore> {
  if (STORE_) {
    return STORE_;
  }
  // console.log('getApiStore');
  const store = {};
  const routes = ['about', 'category', 'country', 'homepage', 'label', 'locale', 'market', 'menu', 'notfound', 'page', 'product_index', 'product', 'route'];
  routes.forEach(key => {
    store[key] = new StoreApiService<any>(key);
  });
  STORE_ = store as AppStore;
  return STORE_;
}
