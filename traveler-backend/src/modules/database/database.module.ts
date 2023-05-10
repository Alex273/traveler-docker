import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import {NODE_ENV} from '@constants/app.constants';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('DATABASE_HOST'),
                port: +configService.get('DATABASE_PORT'),
                username: configService.get('DATABASE_USER'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                autoLoadModels: true,
                synchronize: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
