
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

export async function resolveMockApi(api: string): Promise<any> {
  return await readStore(api);
}

export async function parseMockApi(api: string): Promise<any> {
  return await parseJSON(await readStore(api));
}
