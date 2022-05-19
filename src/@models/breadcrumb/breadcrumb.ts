import { IEquatable } from '@core/entity/entity';

export interface IBreadcrumb {
  id?: IEquatable;
  title: string;
  slug: string;
  categoryId: IEquatable;
  schema?: string;
  schemaId?: IEquatable;
  href?: string;
}

export interface Breadcrumb {
  title: string;
  categoryId: IEquatable;
  href?: string;
}
