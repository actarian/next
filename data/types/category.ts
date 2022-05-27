
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type ICategory = {
  id: IEquatable;
  name: string;
  slug: string | ILocalizedString;
  title: string | ILocalizedString;
  categoryId: null | IEquatable;
  pageSchema: string;
  pageId: IEquatable;
  schema: string;
};
