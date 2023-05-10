import { UsersService } from '@modules/users/users.service';
import { MailService } from '@modules/mail/mail.service';
import { RegisterUserDto } from '@modules/register/dto/register.dto';
import { User } from '@models/user/user.model';
import { UserRecord } from '@models/user/types';
import { VerificationToken } from '@models/user/verification-token.model';
export declare class RegisterService {
    private readonly userModel;
    private readonly userVerificationToken;
    private readonly usersService;
    private readonly mailService;
    constructor(userModel: typeof User, userVerificationToken: typeof VerificationToken, usersService: UsersService, mailService: MailService);
    private createTokenAndSendEmail;
    checkAndRegisterInActiveUser(userPayload: RegisterUserDto): Promise<UserRecord | null>;
    setUserActive(userEmail: string): Promise<UserRecord | null>;
}
