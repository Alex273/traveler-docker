import {Controller, Post, Get, Body, Res, Query} from '@nestjs/common';
import {Response} from 'express';
import {RegisterUserDto} from '@modules/register/dto/register.dto';
import {RegisterService} from '@modules/register/register.service';
import {UsersService} from '@modules/users/users.service';
import {apiRegisterPath} from '@constants/api.constants';
import {UserRecord} from '@models/user/types';

@Controller(apiRegisterPath)
export class RegisterController {
    constructor(private registerService: RegisterService, private usersService: UsersService) {}

    @Post()
    register(@Body() registerUserDto: RegisterUserDto): Promise<UserRecord | null> {
        return this.registerService.checkAndRegisterInActiveUser(registerUserDto);
    }

    @Get()
    async confirmEmail(@Res() res: Response, @Query() query: {token: string}): Promise<void> {
        const userVerificationToken = await this.usersService.findUserVerificationToken(query.token);

        if (!userVerificationToken) {
            res.redirect(301, 'http://localhost:5000/register');
            return;
        }

        const updatedUser = await this.registerService.setUserActive(userVerificationToken.userEmail);

        if (!updatedUser) {
            return;
        }

        res.redirect(301, 'http://localhost:5000/login');
    }
}
