
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type IProduct = {
  id: IEquatable;
  slug: string | ILocalizedString;
  title: string | ILocalizedString;
  abstract: ILocalizedString;
  description: ILocalizedString;
  image: string;
  price: number;
  categoryId: IEquatable;
  meta: any;
  schema: string;
};
