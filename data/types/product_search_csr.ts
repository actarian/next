
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type IProduct_search_csr = {
  id: IEquatable;
  slug: ILocalizedString;
  title: ILocalizedString;
  abstract: ILocalizedString;
  description: ILocalizedString;
  categoryId: IEquatable;
  meta: any;
  schema: string;
};
