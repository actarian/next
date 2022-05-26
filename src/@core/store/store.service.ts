import { getApiStore } from '@core/api/api.store';
import { getMockStore } from '@core/mock/mock.store';
import { AppStore } from 'src/entities';

const API_MOCK = (process.env.NEXT_PUBLIC_API_MOCK === 'true') || false;

export async function getStore(): Promise<AppStore> {
  return API_MOCK ? getMockStore() : getApiStore();
}
