import { User } from '@models/user/user.model';
import { VerificationToken } from '@models/user/verification-token.model';
export declare class UsersService {
    private readonly userModel;
    private readonly userVerificationToken;
    constructor(userModel: typeof User, userVerificationToken: typeof VerificationToken);
    findOne(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    remove(id: string): Promise<void>;
    findUserVerificationToken(verificationToken: string): Promise<VerificationToken | null>;
}
