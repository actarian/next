// import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { IEquatable } from 'types';

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
