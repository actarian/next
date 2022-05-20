import { IEntity, IEquatable, IQuerable } from '../entity/entity';

export default class JsonService<T extends IEntity> implements IQuerable<IEntity> {
  collection: T[];

  constructor(collection: T[]) {
    this.collection = collection;
  }

  findOne(id: IEquatable): Promise<T | null> {
    return new Promise<T>((resolve, reject) => {
      const item = this.collection.find(x => x.id === id);
      if (item) {
        resolve(item);
      } else {
        resolve(null);
      }
    });
  }

  findMany(params: {
    where?: { [key: string]: any }
  } = {}): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      let collection = this.collection;
      collection = this.where_(collection, params.where);
      if (params.where) {
        const keys = Object.keys(params.where);
        collection = collection.filter(x => keys.reduce((p: boolean, c: string) => {
          return p && (x[c] === params.where[c]);
        }, true));
      }
      resolve(collection);
    });
  }

  private where_(items: any[], where: { [key: string]: any }): any[] {
    if (where) {
      const keys = Object.keys(where);
      items = items.filter(x => {
        return keys.reduce<boolean>((p, c) => {
          return p && (x[c] === where[c]);
        }, true);
      })
    }
    return items;
  }

  create(payload): Promise<T> {
    return new Promise<T | null>((resolve, reject) => {
      try {
        const item = { ...payload, id: newUUID() };
        this.collection.push(item);
        resolve(item);
      } catch (error) {
        reject(error);
      }
    });
  }

  update(payload): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const index = this.collection.reduce((p, c, i) => {
        return c.id === payload.id ? i : p;
      }, -1);
      if (index !== -1) {
        const item = { ...this.collection[index], payload };
        this.collection[index] = item;
        return resolve(item);
      }
      reject();
    });
  }

  delete(id: IEquatable) {
    return new Promise<T>((resolve, reject) => {
      const index = this.collection.reduce((p, c, i) => {
        return c.id === id ? i : p;
      }, -1);
      if (index !== -1) {
        const item = this.collection[index];
        this.collection.splice(index, 1);
        return resolve(item);
      }
      resolve(null);
    });
  }
}

function newUUID() {
  return new Date().getTime();
}
