import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from '@models/user/user.model';
import {VerificationToken} from '@models/user/verification-token.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        @InjectModel(VerificationToken)
        private readonly userVerificationToken: typeof VerificationToken,
    ) {}

    findOne(email: string): Promise<User | null> {
        return this.userModel.findOne({
            where: {
                email,
            },
        });
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);

        if (user) {
            await user.destroy();
        }
    }

    async findUserVerificationToken(verificationToken: string): Promise<VerificationToken | null> {
        const verificationTokenRecord = await this.userVerificationToken.findOne({
            where: {
                token: verificationToken,
            },
        });

        return verificationTokenRecord || null;
    }
}
