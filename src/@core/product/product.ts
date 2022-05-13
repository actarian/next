import { IEquatable } from 'types';

export interface Product {
  id: IEquatable;
  slug: string;
  title: string;
  abstract: string;
  description: string;
  image: string;
  price: number;
  categoryId: IEquatable;
}
