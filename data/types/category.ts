
  import { IEquatable} from '@core/entity/entity';

  export interface Category {
    id: IEquatable;
    name: string;
    title: string;
    slug: string;
    categoryId: null | IEquatable;
  }
