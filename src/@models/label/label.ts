import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface ILabel {
  id: IEquatable;
  schema?: string;
  text?: string | ILocalizedString;
}
