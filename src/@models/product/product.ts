import type { IEquatable } from '@core';

export interface IProduct {
  id: IEquatable;
  schema: string;
  slug: string;
  title: string;
  abstract: string;
  description: string;
  image: string;
  price: number;
  categoryId: IEquatable;
  href?: string;
}
