import { IEquatable } from '@core/entity/entity';

export interface IMarket {
  id: string;
  schema?: string;
  title?: string;
  isDefault?: boolean;
  countries?: IEquatable[];
  languages?: IEquatable[];
}
