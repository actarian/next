// import { NextApiRequest, NextApiResponse } from 'next';
import { IEquatable } from '@core/entity/entity';
import { NextApiRequest } from 'next';

export type SchemaType = 'homepage' | 'about' | 'products' | 'product';

export interface Slug {
  slug: string;
  schema: SchemaType;
  id: IEquatable;
}

interface SlugRequest extends NextApiRequest {
  query: {
    slug: string
  }
}
