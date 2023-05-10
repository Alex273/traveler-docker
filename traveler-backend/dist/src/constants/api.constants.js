"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVideoDestination = exports.userAvatarDestination = exports.apiUploadUserProfilePhotos = exports.apiUpload = exports.apiRegisterPath = exports.apiAuthRefreshTokensPath = exports.apiAuthLogoutPath = exports.apiAuthLoginPath = exports.apiAuthPath = void 0;
exports.apiAuthPath = 'api/auth';
exports.apiAuthLoginPath = `${exports.apiAuthPath}/login`;
exports.apiAuthLogoutPath = `${exports.apiAuthPath}/logout`;
exports.apiAuthRefreshTokensPath = `${exports.apiAuthPath}/refresh-tokens`;
exports.apiRegisterPath = 'api/register';
exports.apiUpload = 'api/upload';
exports.apiUploadUserProfilePhotos = `${exports.apiUpload}/user/profile/photos`;
exports.userAvatarDestination = 'upload/user/profile/photos';
exports.userVideoDestination = 'upload/user/profile/videos';
//# sourceMappingURL=api.constants.js.map