
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Locale {
  id: IEquatable;
  schema: string;
  code: string;
  title: string;
  isDefault: any;
}
