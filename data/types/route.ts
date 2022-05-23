
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface Route {
  href: string;
  market: string;
  locale: string;
  pageSchema: string;
  pageId: IEquatable;
}
