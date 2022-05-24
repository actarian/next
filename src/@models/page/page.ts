// import { NextApiRequest, NextApiResponse } from 'next';
import { IEquatable } from '@core/entity/entity';
import { RouteLink, SchemaType } from '@models/route/route';
import { Locale } from 'data/types/locale';
import { Market } from 'data/types/market';

export interface Page {
  id: IEquatable;
  slug: string;
  schema: SchemaType;
  title?: string;
  abstract?: string;
  description?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  meta?: Meta;
  images: Image[];
}

export interface PageFull extends Page {
  market: string;
  locale: string;
  markets: Market[];
  locales: Locale[];
  href: string;
  alternate: string[];
  tree: RouteLink;
  breadcrumb: RouteLink[];
  [key: string]: any;
}

export interface Meta {
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
}

// !!! MenuItem ?
export interface Breadcrumb {
  id: IEquatable;
  name?: string;
  title?: string;
  categoryId?: IEquatable;
  schema?: SchemaType;
  schemaId?: IEquatable;
  href: string;
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
