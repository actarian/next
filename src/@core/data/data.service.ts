import JsonService from '@core/entity/json.service';
import { fsReadJson, pathJoin } from '@core/fs/fs.service';

let STORE = null;

export async function getData(): Promise<any> {
  if (STORE) {
    return STORE;
  }
  const pathname = pathJoin('data', 'data.json');
  const json = await fsReadJson(pathname);
  let data = {};
  Object.keys(json).forEach(key => {
    data[key] = new JsonService(json[key]);
  });
  STORE = data;
  return data;
}

