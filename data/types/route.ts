
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export interface IRoute {
  href: string;
  market: string;
  locale: string;
  pageSchema: string;
  pageId: IEquatable;
}
