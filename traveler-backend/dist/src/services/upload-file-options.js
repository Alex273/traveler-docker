"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoOptions = exports.imageOptions = void 0;
const multer_1 = require("multer");
const api_constants_1 = require("../constants/api.constants");
const imageFileTypes = /(jpeg|jpg|png|gif)/;
const videoFileTypes = /(mp4|avi|mkv)/;
const fileFilter = (fileTypes) => (_req, file, callback) => {
    if (!Boolean(file.mimetype.match(fileTypes))) {
        return callback(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE'), false);
    }
    callback(null, true);
};
const imageLimits = {
    fileSize: 500 * 1024,
};
const videoLimits = {
    fileSize: 50 * 1024 * 1024,
};
exports.imageOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: api_constants_1.userAvatarDestination,
        filename: (_req, file, cb) => {
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            return cb(null, `${randomName}_${file.originalname}`);
        },
    }),
    limits: imageLimits,
    fileFilter: fileFilter(imageFileTypes),
};
exports.videoOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: api_constants_1.userVideoDestination,
        filename: (_req, file, cb) => {
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            return cb(null, `${randomName}_${file.originalname}`);
        },
    }),
    limits: videoLimits,
    fileFilter: fileFilter(videoFileTypes),
};
//# sourceMappingURL=upload-file-options.js.map