
export const SCHEMA = {
  homepage: (slug) => '/',
  about: (slug) => '/about',
  products: (slug) => '/products',
  product: (slug) => `/product/${slug.id}`,
};
