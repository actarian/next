
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type ILocale = {
  id: IEquatable;
  title: string;
  isDefault: boolean;
  schema: string;
};
