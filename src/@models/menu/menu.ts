import type { IEquatable } from '@core/entity/entity';

export interface IMenu {
  id: IEquatable;
  items: IMenuItem[];
}

export interface IMenuItem {
  name: string;
  href: string;
}
