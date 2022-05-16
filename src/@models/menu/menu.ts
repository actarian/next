import { IEquatable } from '@core/entity/entity';

export interface Menu {
  id: IEquatable;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  slug: string;
}
