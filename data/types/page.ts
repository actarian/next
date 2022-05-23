
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Page {
  id: IEquatable;
  schema: string;
  slug: string;
  title: string | ILocalizedString;
  abstract: string;
  description: string;
  image: string;
  categoryId: IEquatable;
  meta: any;
  href: string;
  price?: number;
}
