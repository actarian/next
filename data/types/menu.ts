
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Menu {
  id: IEquatable;
  items: any[];
  schema: string;
}
