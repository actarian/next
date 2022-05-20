const path = require('path');
const pluralize = require('pluralize');

import { IEntity } from '@core/entity/entity';
import { fsExistOrCreateFolder, fsExists, fsReadJson, fsWrite, fsWriteJson } from '@core/fs/fs.service';
import { isLocalizedString } from '@core/locale/locale.service';
import MockService from '@core/mock/mock.service';
import { CollectionDescription, Store } from '@core/store/store';
import { awaitAll, isDevelopment } from '@core/utils';
import { resolveHref } from '@models/breadcrumb/breadcrumb.service';
import { ICategorized } from '@models/category/category';
import { PAGES } from 'src/pages';

export async function getMockStore(): Promise<Store> {
  console.log('rebuilding store');
  const pathname = path.join(process.cwd(), 'data', 'data.json');
  // const pathname = pathJoin('data', 'data.json'); // !!! not working
  const json = await fsReadJson(pathname);
  const data = await remapData(json);
  return data;
}

export async function getCachedMockStore(): Promise<Store> {
  const cwd = process.cwd();
  const cacheDirectory = path.join(cwd, '.cache');
  await fsExistOrCreateFolder(cacheDirectory);
  const pathname = path.join(cwd, '.cache', 'store.json');
  // const pathname = pathJoin('.cache', 'store.json'); // !!! not working
  const exists = await fsExists(pathname);
  if (exists) {
    const storeData = await fsReadJson(pathname);
    if (storeData) {
      const store = {};
      Object.keys(storeData).map(key => {
        store[key] = new MockService(storeData[key]);
      });
      return store;
    }
  }
  const store = await getMockStore();
  const storeData = {};
  Object.keys(store).map(key => {
    storeData[key] = (store[key] as MockService<IEntity>).collection;
  });
  await fsWriteJson(pathname, storeData);
  return store;
}

function remapCollection(key: string): CollectionDescription {
  return {
    singularName: key,
    pluralName: pluralize(key),
    displayName: key.charAt(0).toUpperCase() + key.substring(1, key.length).toLowerCase(),
  };
}

function toMockService(c: CollectionDescription, collection: IEntity[]): MockService<IEntity> {
  if (c.singularName === c.pluralName) {
    throw `DataService.getData: invalid plural key: ${c.singularName}`;
  }
  return new MockService(collection);
}

async function remapData(json: any): Promise<Store> {
  let store: Store = {};
  const collections: CollectionDescription[] = Object.keys(json).map(key => remapCollection(key));
  collections.forEach((c) => {
    store[c.singularName] = toMockService(c, json[c.singularName]);
  });
  const pageService = await getPageService(store);
  store['page'] = pageService;
  const routeService = await getRouteService(store);
  store['route'] = routeService;
  // Object.keys(store).forEach(key => console.log((store[key] as MockService<any>).collection));
  if (isDevelopment) {
    await awaitAll(collections, async (c) => await addType(json[c.singularName], c, collections));
  }
  return store;
}

async function getPageService(store: Store) {
  const keys = Object.keys(PAGES);
  const pages = [];
  for (const key of keys) {
    const collection = store[key];
    const items = await collection.findMany() as ICategorized[];
    for (let item of items) {
      const href = await resolveHref(item, store);
      if (href) {
        pages.push({ ...item, href });
      }
    }
  }
  // console.log('pages', pages);
  const pageCollection = remapCollection('page');
  const pageService = toMockService(pageCollection, pages);
  return pageService;
}

async function getRouteService(store: Store) {
  const keys = Object.keys(PAGES);
  const routes = [];
  for (const key of keys) {
    const collection = store[key];
    const items = await collection.findMany() as ICategorized[];
    for (let item of items) {
      const href = await resolveHref(item, store);
      if (href) {
        routes.push({
          href: href,
          schema: key,
          schemaId: item.id,
        });
      }
    }
  }
  // console.log('routes', routes);
  const routeCollection = remapCollection('route');
  const routeService = toMockService(routeCollection, routes);
  return routeService;
}

async function addType(items, c, collections: CollectionDescription[]): Promise<string> {
  const types = {};
  const keys = [];
  const optionalKeys = [];
  if (Array.isArray(items)) {
    items.forEach((item, i) => {
      Object.keys(item).forEach(key => {
        const type = getType(key, item[key], collections);
        types[key] = types[key] || [];
        if (types[key].indexOf(type) === -1) {
          types[key].push(type);
        }
        if (keys.indexOf(key) === -1) {
          keys.push(key);
          if (i > 0) {
            optionalKeys.push(key);
          }
        }
      });
    });
  }
  if (keys.length === 0) {
    return;
  }
  // console.log(types);
  const type = `
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface ${c.displayName} {
  ${keys.map(key => `${key}${optionalKeys.indexOf(key) !== -1 ? '?' : ''}: ${types[key].join(' | ')};`).join('\n  ')}
}
`;
  // console.log(type);
  const pathname = path.join(process.cwd(), 'data', 'types', `${c.singularName}.ts`);
  await fsWrite(pathname, type);
  return type;
}

function getType(key: string, value: any, collections: CollectionDescription[]): string {
  let type;
  const equatableIds = ['id', ...collections.map(x => x.singularName + 'Id')];
  if (value === null) {
    type = 'null';
  } else if (equatableIds.indexOf(key) !== -1) {
    type = 'IEquatable';
  } else if (typeof value === 'string') {
    type = 'string';
  } else if (typeof value === 'number') {
    type = 'number';
  } else if (isLocalizedString(value)) {
    type = 'ILocalizedString';
  } else if (Array.isArray(value)) {
    type = 'any[]';
  } else {
    type = 'any';
  }
  return type;
}
