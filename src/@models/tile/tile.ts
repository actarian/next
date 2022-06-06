import type { IEquatable } from '@core/entity/entity';

export type ITile = {
  id: IEquatable;
  schema: string;
  category: any;
  title: string;
  abstract: string;
  image: string;
  href: string;
  finish: string;
  size: string;
  featureIds: any[];
};
