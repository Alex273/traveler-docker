import {Module} from '@nestjs/common';
import {PhotosModule} from '@modules/photos/photos.module';
import {UsersModule} from '@modules/users/users.module';
import {RegisterModule} from '@modules/register/register.module';
import {DatabaseModule} from '@modules/database/database.module';
import {MailModule} from '@modules/mail/mail.module';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from '@modules/auth/auth.module';
import {RedisModule} from "@modules/redis/redis.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UsersModule,
        RegisterModule,
        PhotosModule,
        DatabaseModule,
        RedisModule,
        MailModule,
    ],
})
export class AppModule {}
