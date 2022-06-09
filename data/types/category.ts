
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type ICategory = {
  id: IEquatable;
  name: string;
  title: string | ILocalizedString;
  categoryId: null | IEquatable;
  pageSchema: string;
  pageId: IEquatable;
  schema: string;
  slug?: ILocalizedString | string;
};
