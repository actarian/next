import { IEquatable } from '@core/entity/entity';

export interface Product {
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
