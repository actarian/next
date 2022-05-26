
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface ILabel {
  id: IEquatable;
  text: ILocalizedString;
  schema: string;
}
