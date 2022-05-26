// import { NextApiRequest, NextApiResponse } from 'next';
import { IEquatable } from '@core/entity/entity';
import { ILayout } from '@models/layout/layout';
import { IRoute, IRouteLink, SchemaType } from '@models/route/route';

export interface IMeta {
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
}

export interface IImage {
  url: string;
  type?: string;
  alt?: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface IPage {
  id: IEquatable;
  schema: SchemaType;
  categoryId?: IEquatable;
  slug?: string;
  href: string;
  alternates: IRoute[];
  breadcrumb: IRouteLink[];
  title?: string;
  abstract?: string;
  description?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  meta?: IMeta;
  images: IImage[];
  [key: string]: any;
}

export interface IPageLayout extends IPage, ILayout { }
