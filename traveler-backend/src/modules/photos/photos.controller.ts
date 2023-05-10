import {Controller, Get, Post, Body, Req} from '@nestjs/common';
// import {Controller, Get, Post, Body, Req, UseInterceptors, UploadedFiles} from '@nestjs/common';
import {Request} from 'express';
import {CreatePhotoDto} from '@modules/photos/dto/create-photo.dto';
import {PhotosService} from '@modules/photos/photos.service';
import {Photo} from '@interfaces/photo.interface';
// import {apiRegisterPath} from "@modules/register/constants";
// import {FilesInterceptor} from "@nestjs/platform-express";
// import {diskStorage} from "multer";

@Controller('photos')
export class PhotosController {
    constructor(private photosService: PhotosService) {}

    @Get()
    async findAll(@Req() request: Request): Promise<Photo[]> {
        console.log(request);
        return this.photosService.findAll();
    }

    @Post()
    async create(@Body() createPhotoDto: CreatePhotoDto) {
        console.log('createPhotoDto=====', createPhotoDto);
        this.photosService.create(createPhotoDto);
    }
}

// @Controller( `${apiRegisterPath}/profile/photos`)
// export class UserProfilePhotosController {
//     @Post()
//     @UseInterceptors(
//         FilesInterceptor('files', 1, {
//             storage: diskStorage({
//                 destination: './uploads/user/profile/photos',
//             }),
//         }),
//     )
//
//     uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
//         const response: any[] = [];
//
//         files.forEach((file: Express.Multer.File) => {
//             const fileResponse = {
//                 filename: file.filename,
//             };
//
//             response.push(fileResponse);
//         });
//
//         return response;
//     }
// }
