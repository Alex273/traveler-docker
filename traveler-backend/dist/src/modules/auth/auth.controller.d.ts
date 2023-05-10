import { LoginService } from '@modules/auth/login.service';
import { LogoutService } from '@modules/auth/logout.service';
import { RefreshTokensService } from '@modules/auth/refresh-tokens.service';
import { LoginUserDto } from '@modules/auth/dto/auth.dto';
export declare class AuthController {
    private loginService;
    private logoutService;
    private refreshTokensService;
    constructor(loginService: LoginService, logoutService: LogoutService, refreshTokensService: RefreshTokensService);
    login(user: LoginUserDto): Promise<{
        access_token: string;
        user: import("../../models/user/types").UserRecord;
    }>;
    logout(): Promise<void>;
    refreshTokens(): Promise<void>;
}
