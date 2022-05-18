
  import { IEquatable} from '@core/entity/entity';

  export interface Page {
    id: IEquatable;
    schema: string;
    slug: string;
    title: string;
    abstract: string;
    description: string;
    image: string;
    categoryId: IEquatable;
    meta: any;
    breadcrumb: any;
    price?: number;
  }
