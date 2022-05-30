
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type ITile = {
  id: IEquatable;
  schema: string;
  categoryId: IEquatable;
  categoryName: string;
  title: string;
  image: string;
  href: string;
  finish: string;
  size: string;
  featureIds: any[];
};
