import { IEquatable } from '@core/entity/entity';

export interface IBreadcrumb {
  id?: IEquatable;
  title: string;
  slug: string;
  categoryId?: IEquatable;
  pageSchema?: string;
  pageId?: IEquatable;
  href?: string;
}

export interface Breadcrumb {
  categoryId: IEquatable;
  title: string;
  href?: string;
}
