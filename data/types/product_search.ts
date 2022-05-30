
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type IProduct_search = {
  id: IEquatable;
  schema: string;
  slug: ILocalizedString;
  title: ILocalizedString;
  abstract: ILocalizedString;
  description: ILocalizedString;
  categoryId: IEquatable;
  meta: any;
};
