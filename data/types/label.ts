
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type ILabel = {
  id: IEquatable;
  text: ILocalizedString;
  schema: string;
};
