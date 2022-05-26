
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface IProduct_index {
  id: IEquatable;
  schema: string;
  slug: ILocalizedString;
  title: ILocalizedString;
  abstract: ILocalizedString;
  description: ILocalizedString;
  categoryId: IEquatable;
  meta: any;
}
