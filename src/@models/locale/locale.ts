import { IEquatable } from '@core/entity/entity';

export interface Locale {
  id: IEquatable;
  schema?: string;
  code?: string;
  title?: string;
  isDefault?: boolean;
}
