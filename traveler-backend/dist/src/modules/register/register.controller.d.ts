import { Response } from 'express';
import { RegisterUserDto } from '@modules/register/dto/register.dto';
import { RegisterService } from '@modules/register/register.service';
import { UsersService } from '@modules/users/users.service';
import { UserRecord } from '@models/user/types';
export declare class RegisterController {
    private registerService;
    private usersService;
    constructor(registerService: RegisterService, usersService: UsersService);
    register(registerUserDto: RegisterUserDto): Promise<UserRecord | null>;
    confirmEmail(res: Response, query: {
        token: string;
    }): Promise<void>;
}
