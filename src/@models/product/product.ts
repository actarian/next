import type { IEquatable } from '@core/entity/entity';

export interface IProduct {
  id: IEquatable;
  slug: string;
  title: string;
  abstract: string;
  description: string;
  image: string;
  price: number;
  categoryId: IEquatable;
  href?: string;
}
