
  import { IEquatable} from '@core/entity/entity';

  export interface Product_index {
    id: IEquatable;
    schema: string;
    slug: string;
    title: string;
    abstract: string;
    description: string;
    categoryId: IEquatable;
    meta: any;
  }
