import { IEntity, IEquatable, IQuerable } from './entity';

export default class JsonService<T extends IEntity> implements IQuerable<IEntity> {
  collection: T[];

  constructor(collection: T[]) {
    this.collection = collection;
  }

  findOne(id: IEquatable):Promise<T | null> {
    return new Promise<T>((resolve, reject) => {
      const item = this.collection.find(x => x.id === id);
      if (item) {
        resolve(item);
      } else {
        resolve(null);
      }
    });
  }

  findMany():Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      resolve(this.collection);
    });
  }

  create(payload):Promise<T> {
    return new Promise<T | null>((resolve, reject) => {
      try {
        const item = { ...payload, id: newUUID() };
        this.collection.push(item);
        resolve(item);
      } catch (error) {
        reject(error) ;
      }
    });
  }

  update(payload):Promise<T> {
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
