"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const users_module_1 = require("../users/users.module");
const login_service_1 = require("./login.service");
const logout_service_1 = require("./logout.service");
const refresh_tokens_service_1 = require("./refresh-tokens.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const app_constants_1 = require("../../constants/app.constants");
const local_strategy_1 = require("./strategies/local.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: app_constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '36000s' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [login_service_1.LoginService, logout_service_1.LogoutService, refresh_tokens_service_1.RefreshTokensService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        exports: [login_service_1.LoginService, logout_service_1.LogoutService, refresh_tokens_service_1.RefreshTokensService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map