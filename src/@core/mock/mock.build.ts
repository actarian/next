require('module-alias/register');

const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

import { IEntity } from '@core/entity/entity';
import { fsReadJson, fsWrite, fsWriteJson } from '@core/fs/fs.service';
import { CollectionDescription, SerializedCollection, SerializedStore } from '@core/store/store';
import { awaitAll } from '@core/utils';
import { ICategorized } from '@models/category/category';
import { getCategoryTreeWithCategories } from '@models/category/category.service';
import { isLocalizedString, localizedToString } from '@models/locale/locale.service';
import { PAGES } from '../../pages';

if (process.env && process.env.NODE_ENV) {
  dotenv.config({ path: '.env.' + process.env.NODE_ENV });
} else {
  dotenv.config({ path: '.env.development' });
}

const API_MOCK = process.env.NEXT_PUBLIC_API_MOCK || false;
const dataSrc = './data/data.json';

export async function BuildAndWatch() {
  console.log('MockBuild.BuildAndWatch');
  await readStore(dataSrc);
  fs.watchFile(dataSrc, { interval: 2000 }, async (current, previous) => {
    await readStore(dataSrc);
  });
}

if (process.env.NODE_ENV !== 'production') {
  BuildAndWatch();
}

async function readStore(pathname): Promise<SerializedStore> {
  // const pathname = path.join(process.cwd(), 'data', 'data.json');
  // const pathname = pathJoin('data', 'data.json'); // !!! not working
  const json = await fsReadJson(pathname);
  console.log('MockBuild.readStore');
  const store = await buildStore(json);
  console.log('MockBuild.buildStore');
  const outname = path.join(process.cwd(), 'data', 'store', `store.json`);
  await fsWriteJson(outname, store);
  return store;
}

async function buildStore(json: JSON): Promise<SerializedStore> {
  let store: SerializedStore = {};
  let collections: CollectionDescription[] = Object.keys(json).map(key => remapCollection(key));
  collections.forEach((c) => {
    store[c.singularName] = toServiceSchema(c, json[c.singularName]);
  });
  const pageService = getPageService(store);
  store['page'] = pageService;
  const routeService = getRouteService(store);
  store['route'] = routeService;
  // Object.keys(store).forEach(key => console.log((store[key] as MockService<any>).collection));
  collections = Object.keys(store).map(key => store[key]);
  await awaitAll(collections, async (c) => await addType(c.items, c, collections));
  return store;
}

function getPageService(store: SerializedStore): SerializedCollection {
  const keys = Object.keys(PAGES);
  const pages = [];
  for (const key of keys) {
    const collection = store[key];
    if (collection) {
      const items = collection.items as ICategorized[];
      pages.push(...items);
    } else {
      console.warn(`MockBuild.getPageService.collection not found [${key}]`);
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

function getRouteService(store: SerializedStore): SerializedCollection {
  const keys = Object.keys(PAGES);
  const routes = [];
  for (const key of keys) {
    const languages = store.locale.items.map(x => x.id);
    const markets = store.market.items.map(x => ({
      id: x.id,
      languages: x.languages || languages,
    }));
    const collection = store[key];
    if (collection) {
      const items = collection.items;
      for (let item of items) {
        const categoryTree = getCategoryTreeWithCategories(item, store.category.items);
        let availableMarkets = item.markets ? markets.filter(x => item.markets.indexOf(x.id) !== -1) : markets;
        availableMarkets.forEach(m => {
          m.languages.forEach(l => {

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

            const route = {
              href: `/${m.id}/${l}${href}`,
              market: m.id,
              locale: l,
              pageSchema: key,
              pageId: item.id,
            };
            // console.log(route.href);
            routes.push(route);
          });
        });
        if (key === 'homepage') {
          const defaultMarket = markets[0].id;
          const defaultLocale = markets[0].languages[0];
          routes.push({
            href: `/`,
            market: defaultMarket,
            locale: defaultLocale,
            pageSchema: key,
            pageId: item.id,
          });
        }
      }
    } else {
      console.warn(`MockBuild.getRouteService.collection not found [${key}]`);
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

export interface I${c.displayName} {
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
