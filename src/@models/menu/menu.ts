import type { IEquatable } from '@core';

export interface IMenu {
  id: IEquatable;
  items: IMenuItem[];
}

export interface IMenuItem {
  name: string;
  href: string;
}
