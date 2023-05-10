import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {UsersService} from '@modules/users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const userRecord = await this.usersService.findOne(username);

        if (!userRecord) {
            throw new UnauthorizedException('User is not found');
        }

        if (!userRecord.isActive) {
            throw new UnauthorizedException('You account is not activated, confirm your email');
        }

        const isPasswordCorrect = await argon2.verify(userRecord.password, password);

        if (!isPasswordCorrect) {
            throw new UnauthorizedException('Incorrect email or password');
        }

        return {
            email: username,
            role: userRecord.role,
        };
    }
}
