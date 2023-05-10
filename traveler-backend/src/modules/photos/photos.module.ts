import {Module} from '@nestjs/common';
import {PhotosController} from '@modules/photos/photos.controller';
import {PhotosService} from '@modules/photos/photos.service';

@Module({
    controllers: [PhotosController],
    providers: [PhotosService],
})
export class PhotosModule {}
