
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type IMenu = {
  id: IEquatable;
  items: any[];
  schema: string;
};
