import { IEquatable } from '@core/entity/entity';

export type ITile = {
  id: IEquatable;
  schema: string;
  category: any;
  title: string;
  image: string;
  url: string;
  finish: string;
  size: string;
  featureIds: any[];
};
