
import { IEquatable, ILocalizedString } from '@core/entity/entity';

export type IHomepage = {
  id: IEquatable;
  slug: string;
  title: ILocalizedString;
  abstract: ILocalizedString;
  description: ILocalizedString;
  image: string;
  categoryId: IEquatable;
  meta: any;
  schema: string;
};
