// import { NextApiRequest, NextApiResponse } from 'next';
import { IEquatable } from '@core/entity/entity';
import { SchemaType } from '@models/route/route';

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
  // locale?: string;
  // markets?: string[];
  breadcrumb?: Breadcrumb[];
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
