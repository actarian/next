
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Dealer {
  id: IEquatable;
  name: string;
  slug: string;
  title: string;
}
