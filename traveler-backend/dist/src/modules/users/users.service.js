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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../../models/user/user.model");
const verification_token_model_1 = require("../../models/user/verification-token.model");
let UsersService = class UsersService {
    constructor(userModel, userVerificationToken) {
        this.userModel = userModel;
        this.userVerificationToken = userVerificationToken;
    }
    findOne(email) {
        return this.userModel.findOne({
            where: {
                email,
            },
        });
    }
    async findAll() {
        return this.userModel.findAll();
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (user) {
            await user.destroy();
        }
    }
    async findUserVerificationToken(verificationToken) {
        const verificationTokenRecord = await this.userVerificationToken.findOne({
            where: {
                token: verificationToken,
            },
        });
        return verificationTokenRecord || null;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(verification_token_model_1.VerificationToken)),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map