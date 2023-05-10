import {Controller, Post, Get, UploadedFiles, UseInterceptors, Res, Param} from '@nestjs/common';
import {apiUploadUserProfilePhotos, userAvatarDestination} from '@constants/api.constants';
import {FilesInterceptor} from '@nestjs/platform-express';
import {imageOptions} from '@services/upload-file-options';

@Controller(apiUploadUserProfilePhotos)
export class ProfilePhotosController {
    @Get('/:filename')
    async getFile(@Param('filename') filename: string, @Res() res: any) {
        res.sendFile(filename, {root: userAvatarDestination});
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files', 1, imageOptions))
    uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
        const response: any[] = [];

        files.forEach((file: Express.Multer.File) => {
            const fileResponse = {
                filename: file.filename,
            };

            response.push(fileResponse);
        });

        return response;
    }
}
