// import { NextApiRequest, NextApiResponse } from 'next';
import { IEquatable } from '@core/entity/entity';
import { NextApiRequest } from 'next';

export type SchemaType = 'homepage' | 'about' | 'product_index' | 'product';

export interface Route {
  href: string;
  schema: SchemaType;
  schemaId: IEquatable;
}

interface RouteRequest extends NextApiRequest {
  query: {
    href: string
  }
}
