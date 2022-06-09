
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type IFeature_type = {
  id: IEquatable;
  title: string;
  features: any[];
  schema: string;
};
