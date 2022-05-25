// import { NextApiRequest, NextApiResponse } from 'next';
import { IEquatable } from '@core/entity/entity';
import { Layout } from '@models/layout/layout';
import { Route, RouteLink, SchemaType } from '@models/route/route';

export interface Meta {
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
}

export interface Image {
  url: string;
  type?: string;
  alt?: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface Page {
  id: IEquatable;
  schema: SchemaType;
  categoryId?: IEquatable;
  slug?: string;
  href: string;
  alternates: Route[];
  breadcrumb: RouteLink[];
  title?: string;
  abstract?: string;
  description?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  meta?: Meta;
  images: Image[];
  [key: string]: any;
}

export interface PageLayout extends Page, Layout { }

export type PageParams = {
  id: IEquatable,
  market: string,
  locale: string,
  [key: string]: any,
};
