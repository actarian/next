
export type IEquatable = string | number;
export type ILocalizedString = { [key: string]: string };
export interface IEntity {
  id: IEquatable;
  [key: string]: any;
}

export interface IQuerable<T extends IEntity> {
  findMany(params?: FindManyParams): Promise<T[]>;
  findOne(id: IEquatable): Promise<T | null>;
  create(payload: T): Promise<T>;
  update(payload: T): Promise<T>;
  delete(id: IEquatable): Promise<T | null>;
}

export interface FindManyParams {
  where?: { [key: string]: any }
}
