import { apiGet, IEquatable, ISchema } from '@core';
import { IProduct } from '@models';
import { useEffect, useState } from 'react';
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
  find: (item: ISchema) => {
    return get().items.find(x => x.schema === item.schema && x.id === item.id);
  },
  add: (item: ISchema, qty: number = 1) => set(state => {
    const items = state.items.slice();
    const index = items.reduce((p, c, i) => (c.schema === item.schema && c.id === item.id) ? i : p, -1);
    if (index === -1) {
      items.push({ id: item.id, schema: item.schema, qty });
    }
    return { items };
  }),
  remove: (item: ISchema) => {
    let count = 0;
    set(state => {
      const items = state.items.slice();
      const index = items.reduce((p, c, i) => (c.schema === item.schema && c.id === item.id) ? i : p, -1);
      if (index !== -1) {
        items.splice(index, 1);
      }
      count = items.length;
      return { items };
    });
    return count;
  },
  update: (item: ICartItem) => set(state => {
    const items = state.items.slice();
    const index = items.reduce((p, c, i) => (c.schema === item.schema && c.id === item.id) ? i : p, -1);
    if (index !== -1) {
      items[index] = item;
    }
    return { items };
  }),
  clear: () => set(state => ({ items: [] })),
});

export const useCart =
  PERSIST ?
    create<ICartStore>()(persist(cartStore, { name: 'cart' })) :
    create<ICartStore>(cartStore as StateCreator<any>);

export function useCartItems(locale: string, shouldFetch: boolean = true) {
  const { items } = useCart();
  const [cartItems, setCartItems] = useState<ICartMiniItem[]>([]);

  const fetchData = async () => {
    // console.log('useCartItems', 'fetchData');
    const products = await apiGet(`/product?locale=${locale}`) as IProduct[];
    if (products) {
      const cartItems = items.map(x => {
        const product = products.find(p => p.schema === x.schema && p.id === x.id);
        if (product) {
          return {
            ...product,
            ...x,
          };
        } else {
          return null;
        }
      }).filter(x => x !== null) as ICartMiniItem[];
      setCartItems(cartItems);
    }
  };

  // console.log('useCartItems', items.length);

  /*
  const fetchItems = useCallback(() => {
    fetchData().catch(console.error);
  }, [items, locale]);
  */

  useEffect(() => {
    if (shouldFetch) {
      fetchData().catch(console.error);
    }
  }, [items, locale, shouldFetch]);

  return { cartItems };
}

export type ICartMiniItem = {
  id: IEquatable;
  schema: string;
  image: string;
  title: string;
  href: string;
  price: number;
  qty: number;
}

export interface ICartItem extends ISchema {
  id: IEquatable;
  schema: string;
  qty: number;
}

export interface ICartStore {
  items: ICartItem[];
  count(): number;
  has(item: ISchema): boolean;
  find(item: ISchema): ICartItem | undefined;
  add(item: ISchema, qty: number): void;
  remove(item: ISchema): number;
  update(item: ICartItem): void;
  clear(): void;
}

export type IStateCreator<T extends object> = StateCreator<T, any, [], T>;
