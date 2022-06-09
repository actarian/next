import type { IEquatable, ILocalizedString } from '@core';

export interface ILabel {
  id: IEquatable;
  schema?: string;
  text?: string | ILocalizedString;
}
