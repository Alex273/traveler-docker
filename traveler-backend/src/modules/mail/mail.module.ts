import {MailerModule} from '@nestjs-modules/mailer';
import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {join} from 'path';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {MailService} from '@modules/mail/mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get('EMAIL_HOST'),
                    secure: false,
                    auth: {
                        user: configService.get('EMAIL_USER'),
                        pass: configService.get('EMAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: '<sendgrid_from_email_address>',
                },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
        ConfigModule.forRoot(),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
