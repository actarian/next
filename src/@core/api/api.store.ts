import { AppStore } from 'src/entities';
import ApiService from './api.service';

export async function getApiStore(): Promise<AppStore> {
  console.log('getApiStore');
  const store = {};
  const routes = ['about', 'category', 'country', 'homepage', 'label', 'locale', 'market', 'menu', 'notfound', 'page', 'product_index', 'product', 'route'];
  routes.forEach(key => {
    store[key] = new ApiService<any>(key);
  });
  // console.log(store.route.collection);
  return store as AppStore;
}
