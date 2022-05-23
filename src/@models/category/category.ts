import { IEquatable } from '@core/entity/entity';

export interface Category {
  id: IEquatable;
  name: string;
  title: string;
  slug: string;
  categoryId?: IEquatable;
  pageSchema?: string;
  pageId?: IEquatable;
}

export interface ICategorized {
  id: IEquatable;
  schema: string;
  title: string;
  slug: string;
  categoryId: IEquatable;
}
