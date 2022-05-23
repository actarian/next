
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Notfound {
  id: IEquatable;
  slug: string;
  title: string;
  abstract: string;
  description: string;
  meta: any;
  schema: string;
}
