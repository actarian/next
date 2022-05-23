import { IEntity, IQuerable } from '@core/entity/entity';

export type Store = {
  [key: string]: IQuerable<IEntity>;
};

export type CollectionDescription = {
  singularName: string;
  pluralName: string;
  displayName: string;
};

export type SerializedCollection = {
  singularName: string;
  pluralName: string;
  displayName: string;
  items: any[];
};

export type SerializedStore = {
  [key: string]: SerializedCollection;
};
