import { IEquatable, ISchema } from '@core';
import create, { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

const PERSIST = true;

const cartStore: IStateCreator<ICartStore> = (set, get) => ({
  items: [],
  count: () => {
    return get().items.length;
  },
  has: (item: ISchema) => {
    return get().items.find(x => x.schema === item.schema && x.id === item.id) != null;
  },
  add: (item: ISchema) => set(state => {
    const items = state.items.slice();
    const index = items.reduce((p, c, i) => (c.schema === item.schema && c.id === item.id) ? i : p, -1);
    if (index === -1) {
      items.push({ id: item.id, schema: item.schema, qty: 1 });
    }
    return { items };
  }),
  remove: (item: ISchema) => set(state => {
    const items = state.items.slice();
    const index = items.reduce((p, c, i) => (c.schema === item.schema && c.id === item.id) ? i : p, -1);
    if (index !== -1) {
      items.splice(index, 1);
    }
    return { items };
  }),
  clear: () => set(state => ({ items: [] })),
});

export const useCart =
  PERSIST ?
    create<ICartStore>()(persist(cartStore, { name: 'cart' })) :
    create<ICartStore>(cartStore as StateCreator<any>);

export interface ICartItem extends ISchema {
  id: IEquatable;
  schema: string;
  qty: number;
}

export interface ICartStore {
  items: ICartItem[];
  count(): number;
  has(item: ISchema): boolean;
  add(item: ISchema): void;
  remove(item: ISchema): void;
  clear(): void;
}

export type IStateCreator<T extends object> = StateCreator<T, any, [], T>;

