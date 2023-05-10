import {Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginUserDto} from '@modules/auth/dto/auth.dto';
import {UsersService} from '@modules/users/users.service';
import {JwtService} from '@nestjs/jwt';
import {UserRecord} from '@models/user/types';

@Injectable()
export class LoginService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async login(user: LoginUserDto) {
        const userEmail = user.username;
        const userRecord = await this.usersService.findOne(userEmail);

        if (!userRecord) {
            throw new UnauthorizedException('User is not found');
        }

        const payload = {
            userId: userRecord.id,
            role: userRecord.role,
        };

        const userData: UserRecord = {
            userId: userRecord.id,
            userPhoto: userRecord.userPhoto,
            email: userRecord.email,
            firstName: userRecord.firstName,
            lastName: userRecord.lastName,
            role: userRecord.role,
            isActive: userRecord.isActive,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: userData,
        };
    }
}
