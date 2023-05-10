import { Photo } from '@interfaces/photo.interface';
export declare class PhotosService {
    private readonly photos;
    create(photo: Photo): void;
    findAll(): Photo[];
}
