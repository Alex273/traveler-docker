import { Request } from 'express';
import { CreatePhotoDto } from '@modules/photos/dto/create-photo.dto';
import { PhotosService } from '@modules/photos/photos.service';
import { Photo } from '@interfaces/photo.interface';
export declare class PhotosController {
    private photosService;
    constructor(photosService: PhotosService);
    findAll(request: Request): Promise<Photo[]>;
    create(createPhotoDto: CreatePhotoDto): Promise<void>;
}
