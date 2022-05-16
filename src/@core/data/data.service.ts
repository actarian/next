import JsonService from '@core/entity/json.service';
import { fsReadJson, pathJoin } from '@core/fs/fs.service';

const CACHE = {
  data: null,
};

export async function getData(): Promise<any> {
  if (CACHE.data) {
    return CACHE.data;
  }
  const pathname = pathJoin('data', 'data.json');
  const json = await fsReadJson(pathname);
  let data = {};
  Object.keys(json).forEach(key => {
    data[key] = new JsonService(json[key]);
  });
  CACHE.data = data;
  return data;
}

