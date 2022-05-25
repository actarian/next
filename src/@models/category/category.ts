import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Category {
  id: IEquatable;
  name: string;
  title?: ILocalizedString | string;
  slug?: ILocalizedString | string;
  categoryId?: IEquatable;
  pageSchema?: string;
  pageId?: IEquatable;
}

export interface CategoryItem extends Category {
  items: Category[];
}

export interface ICategorized {
  id: IEquatable;
  schema: string;
  title?: ILocalizedString | string;
  slug?: ILocalizedString | string;
  categoryId?: IEquatable;
}
