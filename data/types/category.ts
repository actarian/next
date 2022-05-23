
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Category {
  id: IEquatable;
  name: string;
  title: string;
  slug: string;
  categoryId: null | IEquatable;
  pageSchema: string;
  pageId: IEquatable;
  schema: string;
}
