import { IEquatable } from '@core';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlist = create<IWishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      count: () => {
        return get().items.length;
      },
      has: (item: IWishlistItem) => {
        return get().items.find(x => x.schema === item.schema && x.id === item.id) != null;
      },
      add: (item: IWishlistItem) => set(state => {
        const items = state.items.slice();
        const index = items.reduce((p, c, i) => (c.schema === item.schema && c.id === item.id) ? i : p, -1);
        if (index === -1) {
          items.push({ id: item.id, schema: item.schema });
        }
        return { items };
      }),
      remove: (item: IWishlistItem) => set(state => {
        const items = state.items.slice();
        const index = items.reduce((p, c, i) => (c.schema === item.schema && c.id === item.id) ? i : p, -1);
        if (index !== -1) {
          items.splice(index, 1);
        }
        return { items };
      }),
      toggle: (item: IWishlistItem) => set(state => {
        const items = state.items.slice();
        const index = items.reduce((p, c, i) => (c.schema === item.schema && c.id === item.id) ? i : p, -1);
        if (index === -1) {
          items.push({ id: item.id, schema: item.schema });
        } else {
          items.splice(index, 1);
        }
        return { items };
      }),
      clear: () => set(state => ({ items: [] })),
    }),
    { name: 'wishlist' }
  )
);

export interface IWishlistItem {
  id: IEquatable;
  schema: string;
}

export interface IWishlistStore {
  items: IWishlistItem[];
  count(): number;
  has(item: IWishlistItem): boolean;
  add(item: IWishlistItem): void;
  remove(item: IWishlistItem): void;
  toggle(item: IWishlistItem): void;
  clear(): void;
}

/*
with context example


With v4 it should look something like

import create from "zustand"
import { persist } from "zustand/middleware"
import createContext from "zustand/context"

interface BearState {
  bearsCount: number,
  addBear: () => void
}

const useBearStore = create<BearState>()(persist(set => ({
  bearsCount: 0,
  addBear: () => set(s => ({ bearsCount: s.bearsCount + 1 }))
})))

const BearContext = createContext<typeof useBearStore>()

const App = () =>
<BearContext.Provider createStore={() => useBearStore}>
{ }
</BearContext.Provider>
Or if you can't or don't want to create the store outside the component then something like this would work...

import create, { StoreApi, Mutate } from "zustand"
import { persist, UseBoundStore } from "zustand/middleware"
import createContext from "zustand/context"

interface BearState {
bearsCount: number,
addBear: () => void
}

type UseBearStore =
UseBoundStore<Mutate<StoreApi<BearState>, [["zustand/persist", BearState]]>>

const BearContext = createContext<UseBearStore>()

const App = () =>
<BearContext.Provider createStore={() =>
  create<BearState>()(persist(set => ({
    bearsCount: 0,
    addBear: () => set(s => ({ bearsCount: s.bearsCount + 1 }))
  })))
}>
  { ... }
</BearContext.Provider>

*/
