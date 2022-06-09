
import { IEquatable, ILocalizedString } from '@core';

export type IRoute = {
  id: IEquatable;
  marketId: IEquatable;
  localeId: IEquatable;
  pageSchema: string;
  pageId: IEquatable;
};
