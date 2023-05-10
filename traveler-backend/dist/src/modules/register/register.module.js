"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const register_controller_1 = require("./register.controller");
const profile_photo_controller_1 = require("./profile-photo.controller");
const user_model_1 = require("../../models/user/user.model");
const users_module_1 = require("../users/users.module");
const mail_module_1 = require("../mail/mail.module");
const register_service_1 = require("./register.service");
const verification_token_model_1 = require("../../models/user/verification-token.model");
let RegisterModule = class RegisterModule {
};
RegisterModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, mail_module_1.MailModule, sequelize_1.SequelizeModule.forFeature([user_model_1.User, verification_token_model_1.VerificationToken])],
        controllers: [register_controller_1.RegisterController, profile_photo_controller_1.ProfilePhotosController],
        providers: [register_service_1.RegisterService],
    })
], RegisterModule);
exports.RegisterModule = RegisterModule;
//# sourceMappingURL=register.module.js.map