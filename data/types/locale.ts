
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type ILocale = {
  id: IEquatable;
  schema: string;
  title: string;
  isDefault: boolean;
};
