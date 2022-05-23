
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

import { IEntity } from '@core/entity/entity';
import { fsReadJson, fsWrite, fsWriteJson } from '@core/fs/fs.service';
import { isLocalizedString } from '@core/locale/locale.service';
import { CollectionDescription, SerializedCollection, SerializedStore } from '@core/store/store';
import { awaitAll, isDevelopment } from '@core/utils';
import { resolveHrefFromCategories } from '@models/breadcrumb/breadcrumb.service';
import { ICategorized } from '@models/category/category';
import { PAGES } from '../src/pages';

const dataSrc = './data/data.json';

export default async function MockBuild(): Promise<SerializedStore> {
  if (isDevelopment) {
    fs.watchFile(dataSrc, { interval: 2000 }, async (current, previous) => {
      await mockData(dataSrc);
    });
    return await mockData(dataSrc);
  }
}

async function mockData(pathname): Promise<SerializedStore>  {
  console.log('rebuilding store');
  // const pathname = path.join(process.cwd(), 'data', 'data.json');
  // const pathname = pathJoin('data', 'data.json'); // !!! not working
  const json = await fsReadJson(pathname);
  const data = await remapData(json);
  const outname = path.join(process.cwd(), 'data', 'mock', `mock.json`);
  await fsWriteJson(outname, data);
  return data;
}

async function remapData(json: JSON): Promise<SerializedStore> {
  let store: SerializedStore = {};
  const collections: CollectionDescription[] = Object.keys(json).map(key => remapCollection(key));
  collections.forEach((c) => {
    store[c.singularName] = toServiceSchema(c, json[c.singularName]);
  });
  const pageService = getPageService(store);
  store['page'] = pageService;
  const routeService = getRouteService(store);
  store['route'] = routeService;
  // Object.keys(store).forEach(key => console.log((store[key] as MockService<any>).collection));
  await awaitAll(collections, async (c) => await addType(json[c.singularName], c, collections));
  return store;
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

function getPageService(store: SerializedStore): SerializedCollection {
  const keys = Object.keys(PAGES);
  const pages = [];
  for (const key of keys) {
    const collection = store[key];
    const items = collection.items as ICategorized[];
    for (let item of items) {
      const href = resolveHrefFromCategories(item, store.category.items);
      if (href) {
        pages.push({ ...item, href });
      }
    }
  }
  // console.log('pages', pages);
  const pageCollection = remapCollection('page');
  const pageService = toServiceSchema(pageCollection, pages);
  return pageService;
}

function getRouteService(store: SerializedStore):SerializedCollection {
  const keys = Object.keys(PAGES);
  const routes = [];
  for (const key of keys) {
    const collection = store[key];
    const items = collection.items;
    for (let item of items) {
      const href = resolveHrefFromCategories(item, store.category.items);
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
  const routeService = toServiceSchema(routeCollection, routes);
  return routeService;
}

function remapCollection(key: string): CollectionDescription {
  return {
    singularName: key,
    pluralName: pluralize(key),
    displayName: key.charAt(0).toUpperCase() + key.substring(1, key.length).toLowerCase(),
  };
}

function toServiceSchema(c: CollectionDescription, collection: IEntity[]): SerializedCollection {
  if (c.singularName === c.pluralName) {
    throw `DataService.getData: invalid plural key: ${c.singularName}`;
  }
  return {
    ...c,
    items: collection,
  };
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
