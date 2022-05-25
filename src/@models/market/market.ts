import { IEquatable } from '@core/entity/entity';

export interface Market {
  id: IEquatable;
  schema?: string;
  code?: string;
  title?: string;
  isDefault?: boolean;
  countries?: IEquatable[];
  languages?: IEquatable[];
}
