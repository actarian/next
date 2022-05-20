
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Country {
  id: IEquatable;
  schema: string;
  code: string;
  title: string;
}
