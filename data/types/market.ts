
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type IMarket = {
  id: IEquatable;
  title: string;
  isDefault: boolean;
  schema: string;
  countries?: any[];
  languages?: any[];
};
