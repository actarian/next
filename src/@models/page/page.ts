// import { NextApiRequest, NextApiResponse } from 'next';
import { IEquatable } from '@core/entity/entity';
import { SchemaType, Slug } from '@models/slug/slug';

export interface Page extends Slug {
  id: IEquatable; // * slug
  slug: string; // * slug
  schema: SchemaType; // * slug
  title?: string;
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

// !!! MenuItem ?
export interface Breadcrumb extends Slug {
  id: IEquatable; // * slug
  slug: string; // * slug
  schema: SchemaType; // * slug
  title?: string;
}

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
