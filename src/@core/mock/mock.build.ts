/* eslint-disable import/first */
require('module-alias/register');

const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

import type { CollectionDescription, IEntity, SerializedCollection, SerializedStore } from '@core';
import { fsReadJson, fsWrite, fsWriteJson } from '@core/fs/fs.service';
import { awaitAll } from '@core/utils';
import type { ICategorized, IMarket, IRoute } from '@models';
import { resolveCategoryTree } from '@models/category/category.service';
import { isLocalizedString, localizedToString } from '@models/locale/locale.service';
import { PAGES } from 'src/types';

if (process.env && process.env.NODE_ENV) {
  dotenv.config({ path: '.env.' + process.env.NODE_ENV });
} else {
  dotenv.config({ path: '.env.development' });
}

async function rebuildStore(pathname: string): Promise<SerializedStore> {
  // const pathname = path.join(process.cwd(), 'data', 'data.json');
  // const pathname = pathJoin('data', 'data.json'); // !!! not working
  console.log('MockBuild.rebuildStore', pathname);
  const json = await fsReadJson(pathname);
  const store = await buildStore(json);
  const outname = path.join(process.cwd(), 'data', 'store', `store.json`);
  await fsWriteJson(outname, store);
  console.log('MockBuild.buildComplete', outname);
  return store;
}

async function buildStore(json: { [key: string]: IEntity[] }): Promise<SerializedStore> {
  let store: SerializedStore = {};
  let collections: CollectionDescription[] = Object.keys(json).map(key => remapCollection(key));
  collections.forEach((c) => {
    store[c.singularName] = toServiceSchema(c, json[c.singularName]);
  });
  const pageService = createPageService(store);
  store['page'] = pageService;
  const routeService = createRouteService(store);
  store['route'] = routeService;
  // Object.keys(store).forEach(key => console.log((store[key] as MockService<any>).collection));
  collections = Object.keys(store).map(key => store[key]);
  await awaitAll(collections, async (c) => await addType(c.items, c, collections));
  return store;
}

function createPageService(store: SerializedStore): SerializedCollection {
  const keys = Object.keys(PAGES);
  const pages = [];
  for (const key of keys) {
    const collection = store[key];
    if (collection) {
      const items = collection.items as ICategorized[];
      pages.push(...items);
    } else {
      console.warn(`MockBuild.createPageService.collection not found [${key}]`);
    }
  }
  // console.log('pages', pages);
  const pageCollection = remapCollection('page');
  const pageService = {
    ...pageCollection,
    items: pages,
  };
  return pageService;
}

function getRoute(href: string, marketId: string, localeId: string, pageSchema: string, pageId: string): IRoute {
  return {
    id: href,
    marketId,
    localeId,
    pageSchema,
    pageId,
  }
}

function createRouteService(store: SerializedStore): SerializedCollection {
  const keys = Object.keys(PAGES);
  // console.log('createRouteService', keys);
  const routes = [];
  for (const key of keys) {
    const languages: string[] = store.locale.items.map(x => x.id);
    const markets: IMarket[] = store.market.items.map(x => ({
      id: x.id,
      languages: x.languages || languages,
    }));
    const collection = store[key];
    if (collection) {
      const items = collection.items;
      // console.log('createRouteService', key, items.length);
      for (let item of items) {
        const categoryTree = resolveCategoryTree(item, store.page.items, store.category.items);
        let availableMarkets = item.markets ? markets.filter(x => item.markets.indexOf(x.id) !== -1) : markets;
        availableMarkets.forEach(m => {
          (m.languages || languages).forEach(l => {
            const href = categoryTree.reduce((p, c, i) => {
              // !!! page.slug || category.slug
              let slug = c.slug;
              if (isLocalizedString(slug)) {
                slug = localizedToString(slug, l);
              }
              slug = `${p}/${slug}`;
              return slug === '/' ? '' : slug;
            }, '');
            // console.log('href', href);
            const route = getRoute(`/${m.id}/${l}${href}`, m.id, l, key, item.id);
            routes.push(route);
          });
        });
        if (key === 'homepage') {
          const defaultMarket = markets[0].id;
          const defaultLocale = markets[0].languages ? markets[0].languages[0] : languages[0];
          const route = getRoute(`/`, defaultMarket, defaultLocale, key, item.id);
          routes.push(route);
        }
      }
    } else {
      console.warn(`MockBuild.createRouteService.collection not found [${key}]`);
    }
  }
  // console.log('routes', routes);
  const routeCollection = remapCollection('route');
  const routeService = {
    ...routeCollection,
    items: routes,
  };
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
    items: collection.map(x => ({ ...x, schema: c.singularName })),
  };
}

async function addType(items: IEntity[], c: CollectionDescription, collections: CollectionDescription[]): Promise<string | undefined> {
  const types: {
    [key: string]: string[]
  } = {};
  const keys: string[] = [];
  const optionalKeys: string[] = [];
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
import { IEquatable, ILocalizedString } from '@core';

export type I${c.displayName} = {
  ${keys.map(key => `${key}${optionalKeys.indexOf(key) !== -1 ? '?' : ''}: ${types[key].join(' | ')};`).join('\n  ')}
};
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
  } else if (typeof value === 'boolean') {
    type = 'boolean';
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

async function BuildAndWatch(pathname: string) {
  // console.log('MockBuild.BuildAndWatch');
  await rebuildStore(pathname);
  fs.watchFile(pathname, { interval: 2000 }, async () => { // (current, previous) => {}
    await rebuildStore(pathname);
  });
}

// console.log(process.argv);

if (process.argv.includes('mock') && process.env.NODE_ENV !== 'production') {
  global.Request = {} as any;
  BuildAndWatch('./data/data.json');
}
