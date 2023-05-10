"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const argon2 = __importStar(require("argon2"));
const users_service_1 = require("../users/users.service");
const mail_service_1 = require("../mail/mail.service");
const user_model_1 = require("../../models/user/user.model");
const verification_token_model_1 = require("../../models/user/verification-token.model");
let RegisterService = class RegisterService {
    constructor(userModel, userVerificationToken, usersService, mailService) {
        this.userModel = userModel;
        this.userVerificationToken = userVerificationToken;
        this.usersService = usersService;
        this.mailService = mailService;
    }
    async createTokenAndSendEmail(userEmail, firstName) {
        const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();
        const verificationTokenRecord = await this.userVerificationToken.create({
            userEmail,
            token: verificationToken,
        });
        await this.mailService.sendConfirmationEmail(verificationTokenRecord.token, firstName, userEmail);
        setTimeout(() => {
            this.userVerificationToken.destroy({
                where: {
                    userEmail: verificationTokenRecord.userEmail,
                },
            });
        }, 4 * 3600 * 1000);
    }
    async checkAndRegisterInActiveUser(userPayload) {
        const { email, firstName, lastName, role, password } = userPayload;
        const isUserExist = await this.usersService.findOne(email);
        if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isActive) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        if (isUserExist && !isUserExist.isActive) {
            await this.createTokenAndSendEmail(isUserExist.email, isUserExist.firstName);
            return {
                userId: isUserExist.id,
                userPhoto: isUserExist.userPhoto,
                email: isUserExist.email,
                firstName: isUserExist.firstName,
                lastName: isUserExist.lastName,
                role: isUserExist.role,
                isActive: isUserExist.isActive,
            };
        }
        if (!isUserExist) {
            const passwordHash = await argon2.hash(password);
            const userRecord = await this.userModel.create({
                userPhoto: userPayload.userPhoto[0],
                email,
                firstName,
                lastName,
                role,
                password: passwordHash,
            });
            await this.createTokenAndSendEmail(userRecord.email, userRecord.firstName);
            setTimeout(() => {
                this.userModel.destroy({
                    where: {
                        email: userRecord.email,
                        isActive: false,
                    },
                });
            }, 8 * 3600 * 1000);
            return {
                userId: userRecord.id,
                userPhoto: userRecord.userPhoto,
                email: userRecord.email,
                firstName: userRecord.firstName,
                lastName: userRecord.lastName,
                role: userRecord.role,
                isActive: userRecord.isActive,
            };
        }
        return null;
    }
    async setUserActive(userEmail) {
        const user = await this.usersService.findOne(userEmail);
        if (!user) {
            return null;
        }
        else {
            user.set({
                isActive: true,
            });
            const updatedUserRecord = await user.save();
            return {
                userId: updatedUserRecord.id,
                userPhoto: updatedUserRecord.userPhoto,
                email: updatedUserRecord.email,
                firstName: updatedUserRecord.firstName,
                lastName: updatedUserRecord.lastName,
                role: updatedUserRecord.role,
                isActive: updatedUserRecord.isActive,
            };
        }
    }
};
RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(verification_token_model_1.VerificationToken)),
    __metadata("design:paramtypes", [Object, Object, users_service_1.UsersService,
        mail_service_1.MailService])
], RegisterService);
exports.RegisterService = RegisterService;
//# sourceMappingURL=register.service.js.map