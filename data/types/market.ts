
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type IMarket = {
  id: IEquatable;
  schema: string;
  title: string;
  isDefault: boolean;
  countries?: any[];
  languages?: any[];
};
