"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const common_1 = require("@nestjs/common");
const register_dto_1 = require("./dto/register.dto");
const register_service_1 = require("./register.service");
const users_service_1 = require("../users/users.service");
const api_constants_1 = require("../../constants/api.constants");
let RegisterController = class RegisterController {
    constructor(registerService, usersService) {
        this.registerService = registerService;
        this.usersService = usersService;
    }
    register(registerUserDto) {
        return this.registerService.checkAndRegisterInActiveUser(registerUserDto);
    }
    async confirmEmail(res, query) {
        const userVerificationToken = await this.usersService.findUserVerificationToken(query.token);
        if (!userVerificationToken) {
            res.redirect(301, 'http://localhost:5000/register');
            return;
        }
        const updatedUser = await this.registerService.setUserActive(userVerificationToken.userEmail);
        if (!updatedUser) {
            return;
        }
        res.redirect(301, 'http://localhost:5000/login');
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "confirmEmail", null);
RegisterController = __decorate([
    (0, common_1.Controller)(api_constants_1.apiRegisterPath),
    __metadata("design:paramtypes", [register_service_1.RegisterService, users_service_1.UsersService])
], RegisterController);
exports.RegisterController = RegisterController;
//# sourceMappingURL=register.controller.js.map