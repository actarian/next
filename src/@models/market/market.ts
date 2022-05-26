import { IEquatable } from '@core/entity/entity';

export interface IMarket {
  id: IEquatable;
  schema?: string;
  code?: string;
  title?: string;
  isDefault?: boolean;
  countries?: IEquatable[];
  languages?: IEquatable[];
}
