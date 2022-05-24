// import { NextApiRequest, NextApiResponse } from 'next';
import { IEquatable } from '@core/entity/entity';
import { NextApiRequest } from 'next';
import { PAGES } from '../../pages';

export type SchemaType = keyof typeof PAGES;

export interface Route {
  href: string;
  market: string;
  locale: string;
  pageSchema: SchemaType;
  pageId: IEquatable;
}

export interface RouteLink {
  href?: string;
  title?: string;
  categoryId?: IEquatable;
  items: RouteLink[];
}

interface RouteRequest extends NextApiRequest {
  query: {
    href: string
  }
}
