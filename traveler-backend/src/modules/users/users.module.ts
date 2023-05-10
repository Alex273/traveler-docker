import {Module} from '@nestjs/common';
import {UsersService} from '@modules/users/users.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from '@models/user/user.model';
import {UsersController} from '@modules/users/users.controller';
import {VerificationToken} from '@models/user/verification-token.model';

@Module({
    imports: [SequelizeModule.forFeature([User, VerificationToken])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
