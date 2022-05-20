
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Product_index {
  id: IEquatable;
  schema: string;
  slug: string;
  title: ILocalizedString;
  abstract: string;
  description: string;
  categoryId: IEquatable;
  meta: any;
}
