const path = require('path');
const fs = require('fs');

export async function fsExists(pathname: string): Promise<boolean> {
  try {
    await fs.promises.access(pathname);
    return true;
  } catch {
    return false
  }
}

export async function fsRead(pathname: string, encoding = 'utf8'): Promise<any> {
  try {
    const data = await fs.promises.readFile(pathname, encoding);
    return data || null;
  } catch (error) {
    console.log('fsRead', error, pathname);
    return null;
  }
}

export async function fsReadJson(pathname: string): Promise<any> {
  try {
    const data = await fsRead(pathname);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (error) {
    console.log('fsReadJson', error, pathname);
    // throw (error);
    return null;
  }
}

export async function fsWrite(pathname: string, data: string, encoding = 'utf8'): Promise<void> {
  try {
    await fs.promises.writeFile(pathname, data, encoding);
  } catch (error) {
    console.log('fsWrite', error, pathname);
  }
}

export async function fsWriteJson(pathname: string, data: any): Promise<void> {
  try {
    await fsWrite(pathname, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('fsWriteJson', error, pathname);
  }
}

export async function fsExistOrCreateFolder(pathname: string): Promise<void> {
  try {
    const exists = fs.existsSync(pathname);
    if (!exists) {
      await fs.promises.mkdir(pathname);
    }
  } catch (error) {
    console.log('fsExistOrCreateFolder', error, pathname);
  }
}

export function pathJoin(...paths: string[]): string {
  return path.join(process.cwd(), ...paths);
}
