import {MailerService} from '@nestjs-modules/mailer';
import {Injectable} from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendConfirmationEmail(token: string, name: string, email: string) {
        const url = `http://localhost:3000/api/register?token=${token}`;

        await this.mailerService.sendMail({
            from: 'frontman273@gmail.com',
            to: email,
            subject: 'Traveler confirmation',
            template: './email',
            context: {
                name,
                url,
            },
        });
    }
}
