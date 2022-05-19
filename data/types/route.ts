
import { IEquatable } from '@core/entity/entity';

export interface Route {
  href: string;
  schema: string;
  schemaId: IEquatable;
}
