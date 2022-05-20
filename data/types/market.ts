
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Market {
  id: IEquatable;
  schema: string;
  code: string;
  title: string;
  isDefault: any;
  countries?: any[];
  languages?: any[];
}
