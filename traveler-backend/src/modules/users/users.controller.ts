import {Controller, Get, Delete, Param} from '@nestjs/common';
import {UsersService} from '@modules/users/users.service';
import {User} from '@models/user/user.model';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('email') id: string): Promise<User | null> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
