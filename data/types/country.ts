
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface ICountry {
  id: IEquatable;
  schema: string;
  code: string;
  title: string;
}
