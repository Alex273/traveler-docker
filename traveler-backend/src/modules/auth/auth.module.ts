import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from '@modules/auth/auth.controller';
import {UsersModule} from '@modules/users/users.module';
import {LoginService} from '@modules/auth/login.service';
import {LogoutService} from '@modules/auth/logout.service';
import {RefreshTokensService} from '@modules/auth/refresh-tokens.service';
import {JwtStrategy} from '@modules/auth/strategies/jwt.strategy';
import {jwtConstants} from '@constants/app.constants';
import {LocalStrategy} from '@modules/auth/strategies/local.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '36000s'},
        }),
    ],
    controllers: [AuthController],
    providers: [LoginService, LogoutService, RefreshTokensService, LocalStrategy, JwtStrategy],
    exports: [LoginService, LogoutService, RefreshTokensService],
})
export class AuthModule {}
