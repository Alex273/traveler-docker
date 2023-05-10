import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {apiAuthLoginPath, apiAuthLogoutPath, apiAuthRefreshTokensPath} from '@constants/api.constants';
import {LoginService} from '@modules/auth/login.service';
import {LogoutService} from '@modules/auth/logout.service';
import {RefreshTokensService} from '@modules/auth/refresh-tokens.service';
import {LoginUserDto} from '@modules/auth/dto/auth.dto';
import {LocalAuthGuard} from '@modules/auth/guards/local-auth.guard';
import {JwtAuthGuard} from '@modules/auth/guards/jwt-auth.guard';

@Controller()
export class AuthController {
    constructor(
        private loginService: LoginService,
        private logoutService: LogoutService,
        private refreshTokensService: RefreshTokensService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post(apiAuthLoginPath)
    async login(@Body() user: LoginUserDto) {
        return this.loginService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post(apiAuthLogoutPath)
    async logout() {
        this.logoutService.logout();
    }

    @Post(apiAuthRefreshTokensPath)
    async refreshTokens() {
        this.refreshTokensService.refreshTokens();
    }
}
