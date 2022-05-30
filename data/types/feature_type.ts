
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type IFeature_type = {
  id: IEquatable;
  schema: string;
  title: string;
  features: any[];
};
