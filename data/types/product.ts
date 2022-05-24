
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Product {
  id: IEquatable;
  schema: string;
  slug: string | ILocalizedString;
  title: string | ILocalizedString;
  abstract: ILocalizedString;
  description: ILocalizedString;
  image: string;
  price: number;
  categoryId: IEquatable;
  meta: any;
}
