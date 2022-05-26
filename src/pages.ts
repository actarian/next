
export const PAGES = {
  homepage: (route) => `/${route.market}/${route.locale}/homepage/${route.pageId}`,
  about: (route) => `/${route.market}/${route.locale}/about/${route.pageId}`,
  product_index: (route) => `/${route.market}/${route.locale}/product_index/${route.pageId}`,
  product: (route) => `/${route.market}/${route.locale}/product/${route.pageId}`, // '/product/:id' // !!!
  notfound: (route) => `/${route.market}/${route.locale}/notfound/${route.pageId}`,
};
