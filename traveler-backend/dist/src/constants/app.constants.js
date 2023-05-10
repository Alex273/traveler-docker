"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = exports.NODE_ENV = void 0;
var NODE_ENV;
(function (NODE_ENV) {
    NODE_ENV["DEVELOPMENT"] = "development";
    NODE_ENV["PRODUCTION"] = "production";
})(NODE_ENV = exports.NODE_ENV || (exports.NODE_ENV = {}));
exports.jwtConstants = {
    secret: 'secretKey',
};
//# sourceMappingURL=app.constants.js.map