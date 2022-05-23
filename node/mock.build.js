"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs = require('fs');
var path = require('path');
var pluralize = require('pluralize');
var fs_service_1 = require("@core/fs/fs.service");
var locale_service_1 = require("@core/locale/locale.service");
var utils_1 = require("@core/utils");
var breadcrumb_service_1 = require("@models/breadcrumb/breadcrumb.service");
var pages_1 = require("../src/pages");
var dataSrc = './data/data.json';
function MockBuild() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!utils_1.isDevelopment) return [3 /*break*/, 2];
                    fs.watchFile(dataSrc, { interval: 2000 }, function (current, previous) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mockData(dataSrc)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, mockData(dataSrc)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = MockBuild;
function mockData(pathname) {
    return __awaiter(this, void 0, void 0, function () {
        var json, data, outname;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('rebuilding store');
                    return [4 /*yield*/, (0, fs_service_1.fsReadJson)(pathname)];
                case 1:
                    json = _a.sent();
                    return [4 /*yield*/, remapData(json)];
                case 2:
                    data = _a.sent();
                    outname = path.join(process.cwd(), 'data', 'mock', "mock.json");
                    return [4 /*yield*/, (0, fs_service_1.fsWriteJson)(outname, data)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function remapData(json) {
    return __awaiter(this, void 0, void 0, function () {
        var store, collections, pageService, routeService;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = {};
                    collections = Object.keys(json).map(function (key) { return remapCollection(key); });
                    collections.forEach(function (c) {
                        store[c.singularName] = toServiceSchema(c, json[c.singularName]);
                    });
                    pageService = getPageService(store);
                    store['page'] = pageService;
                    routeService = getRouteService(store);
                    store['route'] = routeService;
                    // Object.keys(store).forEach(key => console.log((store[key] as MockService<any>).collection));
                    return [4 /*yield*/, (0, utils_1.awaitAll)(collections, function (c) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, addType(json[c.singularName], c, collections)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 1:
                    // Object.keys(store).forEach(key => console.log((store[key] as MockService<any>).collection));
                    _a.sent();
                    return [2 /*return*/, store];
            }
        });
    });
}
function addType(items, c, collections) {
    return __awaiter(this, void 0, void 0, function () {
        var types, keys, optionalKeys, type, pathname;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    types = {};
                    keys = [];
                    optionalKeys = [];
                    if (Array.isArray(items)) {
                        items.forEach(function (item, i) {
                            Object.keys(item).forEach(function (key) {
                                var type = getType(key, item[key], collections);
                                types[key] = types[key] || [];
                                if (types[key].indexOf(type) === -1) {
                                    types[key].push(type);
                                }
                                if (keys.indexOf(key) === -1) {
                                    keys.push(key);
                                    if (i > 0) {
                                        optionalKeys.push(key);
                                    }
                                }
                            });
                        });
                    }
                    if (keys.length === 0) {
                        return [2 /*return*/];
                    }
                    type = "\nimport { IEquatable, ILocalizedString } from '@core/entity/entity';\n\nexport interface ".concat(c.displayName, " {\n  ").concat(keys.map(function (key) { return "".concat(key).concat(optionalKeys.indexOf(key) !== -1 ? '?' : '', ": ").concat(types[key].join(' | '), ";"); }).join('\n  '), "\n}\n");
                    pathname = path.join(process.cwd(), 'data', 'types', "".concat(c.singularName, ".ts"));
                    return [4 /*yield*/, (0, fs_service_1.fsWrite)(pathname, type)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, type];
            }
        });
    });
}
function getPageService(store) {
    var keys = Object.keys(pages_1.PAGES);
    var pages = [];
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var collection = store[key];
        var items = collection.items;
        for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
            var item = items_1[_a];
            var href = (0, breadcrumb_service_1.resolveHrefFromCategories)(item, store.category.items);
            if (href) {
                pages.push(__assign(__assign({}, item), { href: href }));
            }
        }
    }
    // console.log('pages', pages);
    var pageCollection = remapCollection('page');
    var pageService = toServiceSchema(pageCollection, pages);
    return pageService;
}
function getRouteService(store) {
    var keys = Object.keys(pages_1.PAGES);
    var routes = [];
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var collection = store[key];
        var items = collection.items;
        for (var _a = 0, items_2 = items; _a < items_2.length; _a++) {
            var item = items_2[_a];
            var href = (0, breadcrumb_service_1.resolveHrefFromCategories)(item, store.category.items);
            if (href) {
                routes.push({
                    href: href,
                    schema: key,
                    schemaId: item.id
                });
            }
        }
    }
    // console.log('routes', routes);
    var routeCollection = remapCollection('route');
    var routeService = toServiceSchema(routeCollection, routes);
    return routeService;
}
function remapCollection(key) {
    return {
        singularName: key,
        pluralName: pluralize(key),
        displayName: key.charAt(0).toUpperCase() + key.substring(1, key.length).toLowerCase()
    };
}
function toServiceSchema(c, collection) {
    if (c.singularName === c.pluralName) {
        throw "DataService.getData: invalid plural key: ".concat(c.singularName);
    }
    return __assign(__assign({}, c), { items: collection });
}
function getType(key, value, collections) {
    var type;
    var equatableIds = __spreadArray(['id'], collections.map(function (x) { return x.singularName + 'Id'; }), true);
    if (value === null) {
        type = 'null';
    }
    else if (equatableIds.indexOf(key) !== -1) {
        type = 'IEquatable';
    }
    else if (typeof value === 'string') {
        type = 'string';
    }
    else if (typeof value === 'number') {
        type = 'number';
    }
    else if ((0, locale_service_1.isLocalizedString)(value)) {
        type = 'ILocalizedString';
    }
    else if (Array.isArray(value)) {
        type = 'any[]';
    }
    else {
        type = 'any';
    }
    return type;
}
