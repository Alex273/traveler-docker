import { UsersService } from '@modules/users/users.service';
import { User } from '@models/user/user.model';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    remove(id: string): Promise<void>;
}
