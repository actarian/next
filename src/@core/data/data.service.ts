import JsonService from "@core/entity/json.service";


const CACHE = {
  data: null,
};

export async function getData(): Promise<any> {
  if (CACHE.data) {
    return CACHE.data;
  }
  const store = await readStore('data/data');
  const json = await parseJSON(store);
  let data = {};
  Object.keys(json).forEach(key => {
    data[key] = new JsonService(json[key]);
  });
  CACHE.data = data;
  return data;
}

const path = require("path");
const fs = require("fs");

function readStore(pathname) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(process.cwd(), `${pathname}.json`), 'utf8', (error, data) => {
      if (error) {
        console.log('NodeJs.Api.readStore.error', error, pathname);
      } else {
        resolve(data);
      }
    });
  });
}

function parseJSON(json) {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(json);
      resolve(data);
    } catch (error) {
      console.log('NodeJs.Api.readStore.error', error);
      reject(error);
    }
  });
}
