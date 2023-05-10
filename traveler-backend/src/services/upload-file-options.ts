import {diskStorage, MulterError} from 'multer';
import {userAvatarDestination, userVideoDestination} from '@constants/api.constants';

const imageFileTypes = /(jpeg|jpg|png|gif)/;
const videoFileTypes = /(mp4|avi|mkv)/;

const fileFilter =
    (fileTypes: RegExp) =>
    (_req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void): void => {
        if (!Boolean(file.mimetype.match(fileTypes))) {
            //TODO: change error message
            return callback(new MulterError('LIMIT_UNEXPECTED_FILE'), false);
        }

        callback(null, true);
    };

const imageLimits = {
    fileSize: 500 * 1024,
};

const videoLimits = {
    fileSize: 50 * 1024 * 1024,
};

export const imageOptions = {
    storage: diskStorage({
        destination: userAvatarDestination,
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

export const videoOptions = {
    storage: diskStorage({
        destination: userVideoDestination,
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
