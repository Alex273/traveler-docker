import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendConfirmationEmail(token: string, name: string, email: string): Promise<void>;
}
