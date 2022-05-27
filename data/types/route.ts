
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type IRoute = {
  id: IEquatable;
  marketId: IEquatable;
  localeId: IEquatable;
  pageSchema: string;
  pageId: IEquatable;
};
