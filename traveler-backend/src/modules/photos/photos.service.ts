import {Injectable} from '@nestjs/common';
import {Photo} from '@interfaces/photo.interface';

@Injectable()
export class PhotosService {
    private readonly photos: Photo[] = [];

    create(photo: Photo) {
        console.log('photo', photo);
        this.photos.push(photo);
        console.log('this.photos', this.photos);
    }

    findAll(): Photo[] {
        return this.photos;
    }
}
