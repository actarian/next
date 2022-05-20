import { getMockStore } from '@core/mock/mock.store';
import { isDevelopment } from '@core/utils';
import { Store } from './store';

const API_MOCK = process.env.NEXT_PUBLIC_API_MOCK || false;

export async function getStore(): Promise<Store> {
  if (!isDevelopment && !API_MOCK) {
    return null;
  }
  return await getMockStore();
}
