
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Product {
  id: IEquatable;
  schema: string;
  slug: string;
  title: string;
  abstract: string;
  description: string;
  image: string;
  price: number;
  categoryId: IEquatable;
  meta: any;
}
