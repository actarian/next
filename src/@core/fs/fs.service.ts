const path = require('path');
const fs = require('fs');

export async function fsExists(pathname) {
  try {
    await fs.promises.access(pathname);
    return true;
  } catch {
    return false
  }
}

export async function fsRead(pathname, encoding = 'utf8') {
  try {
    const data = await fs.promises.readFile(pathname, encoding);
    return data || null;
  } catch (error) {
    console.log('fsRead', error);
    return null;
  }
}

export async function fsReadJson(pathname) {
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

export async function fsWrite(pathname, data, encoding = 'utf8') {
  try {
    await fs.promises.writeFile(pathname, data, encoding);
  } catch (error) {
    console.log('fsWrite', error);
  }
}

export async function fsWriteJson(pathname, data) {
  try {
    await fsWrite(pathname, JSON.stringify(data));
  } catch (error) {
    console.log('fsWriteJson', error);
  }
}

export async function fsExistOrCreateFolder(pathname) {
  try {
    const exists = fs.existsSync(pathname);
    if (!exists) {
      await fs.promises.mkdir(pathname);
    }
  } catch (error) {
    console.log('fsExistOrCreateFolder', error);
  }
}

export function pathJoin(...paths) {
  return path.join(process.cwd(), ...paths);
}
