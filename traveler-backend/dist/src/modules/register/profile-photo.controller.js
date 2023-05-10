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
exports.ProfilePhotosController = void 0;
const common_1 = require("@nestjs/common");
const api_constants_1 = require("../../constants/api.constants");
const platform_express_1 = require("@nestjs/platform-express");
const upload_file_options_1 = require("../../services/upload-file-options");
let ProfilePhotosController = class ProfilePhotosController {
    async getFile(filename, res) {
        res.sendFile(filename, { root: api_constants_1.userAvatarDestination });
    }
    uploadMultipleFiles(files) {
        const response = [];
        files.forEach((file) => {
            const fileResponse = {
                filename: file.filename,
            };
            response.push(fileResponse);
        });
        return response;
    }
};
__decorate([
    (0, common_1.Get)('/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfilePhotosController.prototype, "getFile", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 1, upload_file_options_1.imageOptions)),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ProfilePhotosController.prototype, "uploadMultipleFiles", null);
ProfilePhotosController = __decorate([
    (0, common_1.Controller)(api_constants_1.apiUploadUserProfilePhotos)
], ProfilePhotosController);
exports.ProfilePhotosController = ProfilePhotosController;
//# sourceMappingURL=profile-photo.controller.js.map