// import { NextApiRequest, NextApiResponse } from 'next';
import { IEquatable } from '@core/entity/entity';
import { PAGES } from 'types';

export type SchemaType = keyof typeof PAGES;

export interface IRoute {
  id: string;
  marketId: string;
  localeId: string;
  pageSchema: string;
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
