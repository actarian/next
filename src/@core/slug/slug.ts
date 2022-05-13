// import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

export type SchemaType = 'homepage' | 'about' | 'products' | 'product';

export interface Slug {
  slug: string;
  schema: SchemaType;
  id: number
}

interface SlugRequest extends NextApiRequest {
  query: {
    slug: string
  }
}
