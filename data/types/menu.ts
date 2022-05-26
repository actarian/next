
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface IMenu {
  id: IEquatable;
  items: any[];
  schema: string;
}
