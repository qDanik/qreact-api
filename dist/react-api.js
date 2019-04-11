'use strict';Object.defineProperty(exports,'__esModule',{value:true});/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}var Http = /** @class */ (function () {
    function Http() {
        this.options = {};
    }
    Http.prototype.create = function (options) {
        this.options = options;
        return this;
    };
    Http.prototype.getOptions = function () {
        return __assign({ headers: this.options.headers }, (this.options.withCredentials && ({ credentials: 'include' })));
    };
    Http.prototype.getUrl = function (url) {
        return this.options.baseUrl + url;
    };
    Http.prototype.post = function (url, params) {
        return window.fetch(this.getUrl(url), __assign({ method: 'post', body: JSON.stringify(params) }, this.getOptions())).then(Http.toJson);
    };
    Http.prototype.get = function (url, params) {
        var query = this.queryString(params);
        return window.fetch("" + this.getUrl(url) + (query && "?" + query), { method: 'get', }).then(Http.toText);
    };
    Http.toJson = function (response) {
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.json()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                data: data,
                                status: response.status,
                            }];
                }
            });
        });
    };
    Http.toText = function (response) {
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.text()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                data: data,
                                status: response.status,
                            }];
                }
            });
        });
    };
    Http.prototype.queryString = function (params, letter, separator) {
        var _this = this;
        if (letter === void 0) { letter = '='; }
        if (separator === void 0) { separator = '&'; }
        if (!params)
            return '';
        var paramsKeys = Object.keys(params);
        var query = paramsKeys.map(function (key) {
            var value = params[key];
            if (typeof value === 'object') {
                var paramValue = _this.queryString(value, ':', ',');
                return key + "={" + paramValue + "}";
            }
            var paramName = letter === '=' ? key : JSON.stringify(key);
            return "" + paramName + letter + JSON.stringify(value);
        });
        return query.join(separator);
    };
    return Http;
}());
var index = new Http();var isObject = function (x) {
    var instance = !(x instanceof RegExp) && !(x instanceof Error) && !(x instanceof Date);
    return typeof x === 'object' && x !== null && instance;
};
var has = function (exclude, key) {
    var callback = function (x) {
        return typeof x === 'string' ? x === key : x.test(key);
    };
    return exclude.some(callback);
};
var preserveCamelCase = function (input) {
    var isLastCharLower = false;
    var isLastCharUpper = false;
    var isLastLastCharUpper = false;
    for (var i = 0; i < input.length; i++) {
        var c = input[i];
        if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
            input = input.slice(0, i) + "-" + input.slice(i);
            isLastCharLower = false;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = true;
            i++;
        }
        else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(c) && c.toLowerCase() === c) {
            input = input.slice(0, i - 1) + "-" + input.slice(i - 1);
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
        }
        else {
            isLastCharLower = c.toLowerCase() === c;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = c.toUpperCase() === c;
        }
    }
    return input;
};
var postProcess = function (x) { return x; };
var camelCase = function (input) {
    if (Array.isArray(input)) {
        input = input.map(function (x) { return x.trim(); })
            .filter(function (x) { return !!x.length; })
            .join('-');
    }
    else {
        input = input.trim();
    }
    if (input.length === 0) {
        return '';
    }
    if (input.length === 1) {
        return input.toLowerCase();
    }
    if (/^[a-z\d]+$/.test(input)) {
        return postProcess(input);
    }
    var hasUpperCase = input !== input.toLowerCase();
    if (hasUpperCase) {
        input = preserveCamelCase(input);
    }
    input = input
        .replace(/^[_.\- ]+/, '')
        .toLowerCase()
        .replace(/[_.\- ]+(\w|$)/g, function (m, p1) { return p1.toUpperCase(); });
    return postProcess(input);
};var CamelCase = /** @class */ (function () {
    function CamelCase(data, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.cache = {};
        this.configure = function (key, value) {
            var exclude = _this.options.exclude;
            if (exclude && has(exclude, key)) {
                return [key, value];
            }
            if (_this.cache[key]) {
                key = _this.cache[key];
                return [key, value];
            }
            var newKey = camelCase(key);
            if (key.length < 100) {
                _this.cache[key] = newKey;
            }
            key = newKey;
            return [key, value];
        };
        this.data = data;
        this.options = __assign({ deep: false }, options);
    }
    CamelCase.prototype.map = function (data, target, seen) {
        var _this = this;
        if (target === void 0) { target = {}; }
        if (seen === void 0) { seen = new WeakMap(); }
        if (seen.has(data)) {
            return seen.get(data);
        }
        seen.set(data, target);
        var mapArray = function (array) { return array.map(function (x) { return (isObject(x) ? _this.map(x, {}, seen) : x); }); };
        if (Array.isArray(data)) {
            return mapArray(data);
        }
        var dataKeys = Object.keys(data);
        var deep = this.options.deep;
        return dataKeys.reduce(function (result, key) {
            var value = data[key];
            var _a = _this.configure(key, value), newKey = _a[0], newValue = _a[1];
            if (deep && isObject(newValue)) {
                target[newKey] = Array.isArray(newValue)
                    ? mapArray(newValue)
                    : _this.map(newValue, target, seen);
                return target;
            }
            target[newKey] = newValue;
            return target;
        }, target);
    };
    CamelCase.prototype.convert = function (data) {
        if (data === void 0) { data = this.data; }
        return this.map(data);
    };
    CamelCase.prototype.result = function () {
        var _this = this;
        if (Array.isArray(this.data)) {
            var inputKeys = Object.keys(this.data);
            return inputKeys.map(function (key) { return _this.convert(_this.data[key]); });
        }
        return this.convert();
    };
    return CamelCase;
}());
var toCamelCase = (function (data, options) {
    var converter = new CamelCase(data, options);
    return converter.result();
});var TMethods;
(function (TMethods) {
    TMethods["get"] = "GET";
    TMethods["head"] = "HEAD";
    TMethods["post"] = "POST";
    TMethods["put"] = "PUT";
    TMethods["delete"] = "DELETE";
    TMethods["connect"] = "CONNECT";
    TMethods["options"] = "OPTIONS";
    TMethods["trace"] = "TRACE";
    TMethods["patch"] = "PATCH";
})(TMethods || (TMethods = {}));var DEFAULT_METHOD = window.DEFAULT_METHOD || TMethods.get;
var CIPHER_STATUS = window.CIPHER_STATUS;
var Api = /** @class */ (function () {
    function Api(baseUrl, endpoints) {
        this.headers = { 'Content-Type': 'application/json' };
        this.http = new Http();
        this.baseUrl = baseUrl || 'www.example.com';
        this.endpoints = endpoints || {};
        this.createHttp();
    }
    Api.prototype.createHttp = function () {
        this.http = this.http.create({
            baseUrl: this.getBaseUrl(),
            headers: this.headers,
            withCredentials: true,
        });
    };
    Api.prototype.configureEndpoint = function (endpoint, params) {
        var paramsArr = Object.keys(params);
        return paramsArr.reduce(function (result, key) { return result.replace(":" + key, params[key]); }, endpoint);
    };
    Api.prototype.configureRequest = function (configuration) {
        var method = configuration.method, options = configuration.options, url = configuration.url;
        var callback = this.http[method.toLowerCase()];
        return callback(url, options.params).then(Api.decrypt);
    };
    Api.prototype.request = function (path, options) {
        var url = this.find(path).toString();
        var method = options.method || DEFAULT_METHOD;
        var params = options.params, urlParams = options.urlParams;
        if (urlParams) {
            url = this.configureEndpoint(url, urlParams);
        }
        return this.configureRequest({ method: method, url: url, options: { params: params } });
    };
    Api.prototype.get = function (name, endpoints) {
        if (endpoints === void 0) { endpoints = this.endpoints; }
        return endpoints[name] ? endpoints[name] : false;
    };
    Api.prototype.endpoint = function (path) {
        return "" + this.getBaseUrl() + this.find(path);
    };
    Api.prototype.find = function (path) {
        var _this = this;
        var paths = path.split('.');
        return paths.reduce(function (result, value) { return _this.get(value, result); }, this.endpoints);
    };
    Api.prototype.getBaseUrl = function () {
        return this.baseUrl;
    };
    Api.prototype.setEndpoints = function (values) {
        this.endpoints = __assign({}, this.endpoints, values);
        return this;
    };
    Api.prototype.setHeaders = function (headers) {
        for (var count = 0; count < headers.length; count++) {
            var header = headers[count];
            this.setHeader(header.name, header.value);
        }
        this.createHttp();
        return this;
    };
    Api.prototype.setHeader = function (name, value) {
        this.headers[name] = value;
        return this;
    };
    Api.prototype.setBaseUrl = function (value) {
        this.baseUrl = value;
        return this;
    };
    Api.decrypt = function (response) {
        var data = response.data;
        if (CIPHER_STATUS) {
            var decrypted = window.di.cipher.decrypt(data);
            try {
                data = toCamelCase(decrypted, { deep: true });
            }
            catch (e) {
                data = decrypted;
            }
        }
        data = typeof data === 'object' ? toCamelCase(data, { deep: true }) : data;
        return __assign({}, response, { data: data });
    };
    return Api;
}());var Connection = /** @class */ (function () {
    function Connection(callback) {
        if (callback === void 0) { callback = null; }
        var _a = window.navigator, connection = _a.connection, onLine = _a.onLine;
        this.status = onLine;
        this.connect = connection;
        if (callback) {
            this.setCallback(callback);
        }
    }
    Connection.prototype.getStatus = function () {
        return this.status;
    };
    Connection.prototype.getType = function () {
        return this.connect.type;
    };
    Connection.prototype.getEffectiveType = function () {
        return this.connect.effectiveType;
    };
    Connection.prototype.getDownlink = function () {
        return this.connect.downlink;
    };
    Connection.prototype.getDownlinkMax = function () {
        return this.connect.downlinkMax;
    };
    Connection.prototype.getRtt = function () {
        return this.connect.rtt;
    };
    Connection.prototype.getSaveData = function () {
        return this.connect.saveData;
    };
    Connection.prototype.setCallback = function (callback) {
        this.connect.onchange = callback;
        return this;
    };
    return Connection;
}());exports.Api=Api;exports.CamelCase=CamelCase;exports.Connection=Connection;exports.Http=Http;exports.http=index;exports.toCamelCase=toCamelCase;