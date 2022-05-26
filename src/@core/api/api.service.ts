import { IEntity } from '@core/entity/entity';
import { FetchRequestOptions, httpFetch } from '@core/http/http.service';
import { merge } from '@core/utils';
import { FindParams, FindWhereParams, IEquatable, IQuerable, toFindParams } from '../entity/entity';

// const URL = process.env.NEXT_PUBLIC_URL === 'https://' ? 'https://localhost:3000' : process.env.NEXT_PUBLIC_URL;
const URL = process.env.NEXT_PUBLIC_STORE_URL;
const API = process.env.NEXT_PUBLIC_API || '/api';
const BEARER = process.env.NEXT_PUBLIC_STRAPI_BEARER || '7584f15d12972fb1e7695e998dd5e4c754f46c74d06a08e8d76f556adcd045e48cd52bed6faac098784471ac273ee40243194b9cff7eba3c4a768f8f41d2d51959a7f767b943c7f0170f6e5f632db523803c357083bf7a7bf03ee8e0df2d8ce5cd52e0211283b34d7781313da775018a9e950433d2b6faf711c20e5a63b25243';

const defaultApiOptions: FetchRequestOptions = {
  // mode: 'cors',
  headers: {
    Authorization: `Bearer ${BEARER}`,
  },
};

// typeof eval === 'function' ? defaultApiOptions.mode = 'cors' : null;

export async function apiFetch(pathname: string, options: FetchRequestOptions = {}): Promise<any> {
  const url = `${URL}${API}${pathname}`;
  const apiOptions = merge({ ...defaultApiOptions }, options);
  const apiResponse = await httpFetch(url, apiOptions);
  return apiResponse;
}

export async function apiGet(url: string, options: FetchRequestOptions = {}): Promise<any> {
  return await apiFetch(url, { ...options, method: 'GET' });
}

export async function apiPost(url: string, payload: any, options: FetchRequestOptions = {}): Promise<any> {
  return await apiFetch(url, { ...options, method: 'POST', body: JSON.stringify(payload) });
}

export async function apiPut(url: string, payload: any, options: FetchRequestOptions = {}): Promise<any> {
  return await apiFetch(url, { ...options, method: 'PUT', body: JSON.stringify(payload) });
}

export async function apiPatch(url: string, payload: any, options: FetchRequestOptions = {}): Promise<any> {
  return await apiFetch(url, { ...options, method: 'PATCH', body: JSON.stringify(payload) });
}

export async function apiDelete(url: string, options: FetchRequestOptions = {}): Promise<any> {
  return await apiFetch(url, { ...options, method: 'DELETE' });
}

export default class ApiService<T extends IEntity> implements IQuerable<IEntity> {
  key: string;

  constructor(key: string) {
    if (!key) {
      throw new Error('ApiService: key is required');
    }
    this.key = key;
  }

  async findOne(idOrParams: IEquatable | FindWhereParams): Promise<T | null> {
    const params = toFindParams(idOrParams);
    console.log(`ApiService.${this.key}.findOne.params`, params);
    const item = await apiGet(`/${this.key}/${params.where.id}`);
    return this.decorator_(item, params);
  }

  async findMany(params: FindParams = {}): Promise<T[]> {
    console.log(`ApiService.${this.key}.findMany.params`, params);
    let items = await apiGet(`/${this.key}`);
    console.log(items);
    items = this.where_(items, params);
    return items.map(x => this.decorator_(x, params));
  }

  async create(payload): Promise<T> {
    const item = await apiPost(`/${this.key}`, payload);
    return this.decorator_(item);
  }

  async update(payload): Promise<T> {
    const item = await apiPut(`/${this.key}`, payload);
    return this.decorator_(item);
  }

  async delete(id: IEquatable) {
    const item = await apiDelete(`/${this.key}/${id.toString()}`);
    return this.decorator_(item);
  }

  protected where_(items: any[], params: FindParams): any[] {
    const where = params.where;
    if (where) {
      const keys = Object.keys(where);
      items = items.filter(x => {
        return keys.reduce<boolean>((p, c) => {
          return p && (x[c] === where[c]);
        }, true);
      })
    }
    return items;
  }

  protected decorator_(item: any, params: FindParams = {}): any {
    return item;
  }

}


