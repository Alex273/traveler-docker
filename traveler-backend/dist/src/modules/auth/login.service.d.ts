import { LoginUserDto } from '@modules/auth/dto/auth.dto';
import { UsersService } from '@modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRecord } from '@models/user/types';
export declare class LoginService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(user: LoginUserDto): Promise<{
        access_token: string;
        user: UserRecord;
    }>;
}
