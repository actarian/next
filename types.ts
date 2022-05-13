import type { NextFetchEvent, NextRequest } from 'next/server';

export type Middleware = (request: NextRequest, event: NextFetchEvent) => Promise<Response | undefined> | Response | undefined;

export type IEquatable = string | number;

export type PageType = {
  params: any;
  locales?: string[];
  locale?: string;
  defaultLocale?: string;
};
