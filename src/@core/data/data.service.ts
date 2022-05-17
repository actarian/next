const path = require('path');
const pluralize = require('pluralize');

import JsonService from '@core/entity/json.service';
import { fsReadJson, fsWrite } from '@core/fs/fs.service';
import { awaitAll, isDevelopment } from '@core/utils';
// import { fsReadJson, pathJoin } from '@core/fs/fs.service';

const API_MOCK = process.env.NEXT_PUBLIC_API_MOCK || false;

export type CollectionDescription = {
  singularName: string;
  pluralName: string;
  displayName: string;
};

let STORE = null;

export async function getData(): Promise<any> {
  if (!isDevelopment && !API_MOCK) {
    return null;
  }
  if (STORE !== null) {
    return STORE;
  }
  const pathname = path.join(process.cwd(), 'data', 'data.json');
  // const pathname = pathJoin('data', 'data.json'); // !!! not working
  const json = await fsReadJson(pathname);
  const data = await remapData(json);
  STORE = data;
  return data;
}

async function remapData(json: any): Promise<any> {
  let data = {};
  const collections: CollectionDescription[] = Object.keys(json).map(key => ({
    singularName: key,
    pluralName: pluralize(key),
    displayName: key.charAt(0).toUpperCase() + key.substring(1, key.length).toLowerCase(),
  }));
  collections.forEach((c) => {
    if (c.singularName === c.pluralName) {
      throw `DataService.getData: invalid plural key: ${c.singularName}`;
    }
    data[c.singularName] = new JsonService(json[c.singularName]);
  });
  await awaitAll(collections, async (c) => await addType(json[c.singularName], c, collections));
  return data;
}

async function addType(data, c, collections: CollectionDescription[]): Promise<string> {
  const types = {};
  const keys = [];
  const optionalKeys = [];
  if (Array.isArray(data)) {
    data.forEach((item, i) => {
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
  // console.log(keys, optionalKeys);
  const type = `
  import { IEquatable} from '@core/entity/entity';

  export interface ${c.displayName} {
    ${keys.map(key => `${key}${optionalKeys.indexOf(key) !== -1 ? '?' : ''}: ${types[key].join(' | ')};`).join('\n    ')}
  }
`;
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
  } else {
    type = 'any';
  }
  return type;
}
