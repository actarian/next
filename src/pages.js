"use strict";
exports.__esModule = true;
exports.PAGES = void 0;
exports.PAGES = {
    homepage: function (route) { return '/'; },
    about: function (route) { return '/about'; },
    product_index: function (route) { return '/product_index'; },
    product: function (route) { return "/product/".concat(route.schemaId); }
};
