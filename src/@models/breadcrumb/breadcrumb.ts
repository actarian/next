import { IEquatable } from '@core/entity/entity';

export interface Breadcrumb {
  categoryId: IEquatable;
  title: string;
  href?: string;
}
