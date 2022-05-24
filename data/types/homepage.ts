
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Homepage {
  id: IEquatable;
  schema: string;
  slug: string;
  title: ILocalizedString;
  abstract: ILocalizedString;
  description: ILocalizedString;
  image: string;
  categoryId: IEquatable;
  meta: any;
}
