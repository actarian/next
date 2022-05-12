import type { NextFetchEvent, NextRequest } from 'next/server';

export type Middleware = (request: NextRequest, event: NextFetchEvent) => Promise<Response | undefined> | Response | undefined;

export interface Product {
  id: string
  title: string
  description: string
  price: number
  stock: number
}
