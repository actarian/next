
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

const PAGES = {
  homepage: (route) => '/',
  about: (route) => '/about',
  product_index: (route) => '/product_index',
  product: (route) => `/product/${route.schemaId}`,
};

const dataSrc = './data/data.json';

mockData(dataSrc);

fs.watchFile(dataSrc, { interval: 2000 }, (current, previous) => {
  mockData(dataSrc);
});

async function mockData(pathname) {
  const json = await fsReadJson(pathname);
  const data = await remapData(json);
  console.log(data);
}

async function remapData(json) {
  let store = {};
  const collections = Object.keys(json).map(key => remapCollection(key));
  collections.forEach((c) => {
    if (c.singularName === c.pluralName) {
      throw `DataService.getData: invalid plural key: ${c.singularName}`;
    }
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

function remapCollection(key) {
  return {
    singularName: key,
    pluralName: pluralize(key),
    displayName: key.charAt(0).toUpperCase() + key.substring(1, key.length).toLowerCase(),
  };
}

function toServiceSchema(c, collection) {
  if (c.singularName === c.pluralName) {
    throw `DataService.getData: invalid plural key: ${c.singularName}`;
  }
  return {
    ...c,
    items: collection,
  };
}

function getPageService(store) {
  const keys = Object.keys(PAGES);
  const pages = [];
  for (const key of keys) {
    const items = store[key].items;
    for (let item of items) {
      const href = resolveHref(item, store);
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

function getRouteService(store) {
  const keys = Object.keys(PAGES);
  const routes = [];
  for (const key of keys) {
    const items = store[key].items;
    for (let item of items) {
      const href = resolveHref(item, store);
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

async function addType(items, c, collections) {
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

function getType(key, value, collections) {
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

function isLocalizedString(value) {
  if (value) {
    if (!Array.isArray(value) && typeof value === 'object') {
      const matchKeys = Object.keys(value).reduce((p, c) => p && /^(\w{2})(-\w{2})?$/.test(c), true);
      const matchValues = Object.values(value).reduce((p, c) => p && typeof c === 'string', true);
      // console.log(matchKeys, matchValues);
      return matchKeys && matchValues;
    }
  }
}

//

function getBreadcrumb(item, store) {
  if (!store) {
    return [];
  }
  const category = store.category;
  if (!category) {
    return [];
  }
  const categories = store.category;
  const breadcrumb = [];
  let categoryId = item.categoryId || null;
  let skipLast = false;
  while (categoryId !== null) {
    // console.log(categoryId);
    const c = categories.items.find(c => c.id === categoryId);
    if (c) {
      const b = { ...c };
      breadcrumb.unshift(b);
      categoryId = b.categoryId || null;
      if (
        b.schema === item.schema &&
        b.schemaId === item.id
      ) {
        skipLast = true;
      }
    } else {
      categoryId = null;
    }
  }
  if (!skipLast) {
    breadcrumb.push({
      title: item.title,
      slug: item.slug,
      schema: item.schema,
      schemaId: item.id,
      categoryId: 0,
    });
  }
  breadcrumb.reduce((p, c, i) => {
    const href = `${p}/${c.slug}`;
    c.href = href;
    return href === '/' ? '' : href;
  }, '');
  // console.log('getBreadcrumb.breadcrumb', breadcrumb);
  return breadcrumb;
}

function resolveHref(item, injectedStore) {
  const breadcrumb = getBreadcrumb(item, injectedStore);
  const href = breadcrumb.length > 0 ? breadcrumb.pop().href : '';
  // console.log('resolveHref', href);
  return href;
}

//

async function awaitAll(array, callback) {
  const promises = array.map(callback);
  return await Promise.all(promises);
}

async function fsExists(pathname) {
  try {
    await fs.promises.access(pathname);
    return true;
  } catch {
    return false
  }
}

async function fsRead(pathname, encoding = 'utf8') {
  try {
    const data = await fs.promises.readFile(pathname, encoding);
    return data || null;
  } catch (error) {
    console.log('fsRead', error);
    return null;
  }
}

async function fsReadJson(pathname) {
  try {
    const data = await fsRead(pathname);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (error) {
    console.log('fsReadJson', error);
    return null;
  }
}

async function fsWrite(pathname, data, encoding = 'utf8') {
  try {
    await fs.promises.writeFile(pathname, data, encoding);
  } catch (error) {
    console.log('fsWrite', error);
  }
}

async function fsWriteJson(pathname, data) {
  try {
    await fsWrite(pathname, JSON.stringify(data));
  } catch (error) {
    console.log('fsWriteJson', error);
  }
}

async function fsExistOrCreateFolder(pathname) {
  try {
    const exists = fs.existsSync(pathname);
    if (!exists) {
      await fs.promises.mkdir(pathname);
    }
  } catch (error) {
    console.log('fsExistOrCreateFolder', error);
  }
}
