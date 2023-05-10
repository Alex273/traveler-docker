import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import * as argon2 from 'argon2';
import {UsersService} from '@modules/users/users.service';
import {MailService} from '@modules/mail/mail.service';
import {RegisterUserDto} from '@modules/register/dto/register.dto';
import {User} from '@models/user/user.model';
import {UserRecord} from '@models/user/types';
import {VerificationToken} from '@models/user/verification-token.model';

@Injectable()
export class RegisterService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        @InjectModel(VerificationToken)
        private readonly userVerificationToken: typeof VerificationToken,
        private readonly usersService: UsersService,
        private readonly mailService: MailService,
    ) {}

    private async createTokenAndSendEmail(userEmail: string, firstName: string): Promise<void> {
        const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();
        const verificationTokenRecord = await this.userVerificationToken.create({
            userEmail,
            token: verificationToken,
        });

        await this.mailService.sendConfirmationEmail(verificationTokenRecord.token, firstName, userEmail);

        setTimeout(() => {
            this.userVerificationToken.destroy({
                where: {
                    userEmail: verificationTokenRecord.userEmail,
                },
            });
        }, 4 * 3600 * 1000);
    }

    async checkAndRegisterInActiveUser(userPayload: RegisterUserDto): Promise<UserRecord | null> {
        const {email, firstName, lastName, role, password} = userPayload;
        const isUserExist = await this.usersService.findOne(email);

        if (isUserExist?.isActive) {
            throw new BadRequestException('User with this email already exists');
        }

        if (isUserExist && !isUserExist.isActive) {
            await this.createTokenAndSendEmail(isUserExist.email, isUserExist.firstName);

            return {
                userId: isUserExist.id,
                userPhoto: isUserExist.userPhoto,
                email: isUserExist.email,
                firstName: isUserExist.firstName,
                lastName: isUserExist.lastName,
                role: isUserExist.role,
                isActive: isUserExist.isActive,
            };
        }

        if (!isUserExist) {
            const passwordHash = await argon2.hash(password);
            const userRecord = await this.userModel.create({
                userPhoto: userPayload.userPhoto[0],
                email,
                firstName,
                lastName,
                role,
                password: passwordHash,
            });

            await this.createTokenAndSendEmail(userRecord.email, userRecord.firstName);

            setTimeout(() => {
                this.userModel.destroy({
                    where: {
                        email: userRecord.email,
                        isActive: false,
                    },
                });
            }, 8 * 3600 * 1000);

            return {
                userId: userRecord.id,
                userPhoto: userRecord.userPhoto,
                email: userRecord.email,
                firstName: userRecord.firstName,
                lastName: userRecord.lastName,
                role: userRecord.role,
                isActive: userRecord.isActive,
            };
        }

        return null;
    }

    async setUserActive(userEmail: string): Promise<UserRecord | null> {
        const user = await this.usersService.findOne(userEmail);

        if (!user) {
            return null;
        } else {
            user.set({
                isActive: true,
            });

            const updatedUserRecord = await user.save();

            return {
                userId: updatedUserRecord.id,
                userPhoto: updatedUserRecord.userPhoto,
                email: updatedUserRecord.email,
                firstName: updatedUserRecord.firstName,
                lastName: updatedUserRecord.lastName,
                role: updatedUserRecord.role,
                isActive: updatedUserRecord.isActive,
            };
        }
    }
}
