
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface IPage {
  id: IEquatable;
  schema: string;
  slug: string | ILocalizedString;
  title: ILocalizedString | string;
  abstract: ILocalizedString;
  description: ILocalizedString;
  image: string;
  categoryId: IEquatable;
  meta: any;
  price?: number;
}
