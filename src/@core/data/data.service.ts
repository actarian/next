const path = require("path");

import JsonService from '@core/entity/json.service';
import { fsReadJson } from '@core/fs/fs.service';
// import { fsReadJson, pathJoin } from '@core/fs/fs.service';

let STORE = null;

export async function getData(): Promise<any> {
  if (STORE) {
    return STORE;
  }
  const pathname = path.join(process.cwd(), 'data', 'data.json');
  // const pathname = pathJoin('data', 'data.json'); // !!! not working
  const json = await fsReadJson(pathname);
  let data = {};
  Object.keys(json).forEach(key => {
    data[key] = new JsonService(json[key]);
  });
  STORE = data;
  return data;
}

