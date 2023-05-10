import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {RegisterController} from '@modules/register/register.controller';
import {ProfilePhotosController} from '@modules/register/profile-photo.controller';
import {User} from '@models/user/user.model';
import {UsersModule} from '@modules/users/users.module';
import {MailModule} from '@modules/mail/mail.module';
import {RegisterService} from '@modules/register/register.service';
import {VerificationToken} from '@models/user/verification-token.model';

@Module({
    imports: [UsersModule, MailModule, SequelizeModule.forFeature([User, VerificationToken])],
    controllers: [RegisterController, ProfilePhotosController],
    providers: [RegisterService],
})
export class RegisterModule {}
