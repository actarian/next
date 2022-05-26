// import { NextApiRequest, NextApiResponse } from 'next';
import { IEquatable } from '@core/entity/entity';
import { NextApiRequest } from 'next';
import { PAGES } from '../../pages';

export type SchemaType = keyof typeof PAGES;

export interface IRoute {
  href: string;
  market: string;
  locale: string;
  pageSchema: SchemaType;
  pageId: IEquatable;
}

export interface IRouteLink {
  href?: string;
  title?: string;
  categoryId?: IEquatable;
  items: IRouteLink[];
}

export interface IRouteParams {
  id: IEquatable,
  market: string,
  locale: string,
  [key: string]: any,
}

interface IRouteRequest extends NextApiRequest {
  query: {
    href: string
  }
}
