
  import { IEquatable} from '@core/entity/entity';

  export interface About {
    id: IEquatable;
    schema: string;
    slug: string;
    title: string;
    abstract: string;
    description: string;
    categoryId: IEquatable;
    meta: any;
  }
