import { IEquatable } from '@core/entity/entity';

export interface ILocale {
  id: IEquatable;
  schema?: string;
  code?: string;
  title?: string;
  isDefault?: boolean;
}
