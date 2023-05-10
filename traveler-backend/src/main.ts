import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from '@modules/app/app.module';
import {NestExpressApplication} from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        rawBody: true,
    });
    app.enableCors();

    const configService = app.get<ConfigService>(ConfigService);
    const PORT = configService.get('PORT');

    await app.listen(PORT);
}

void bootstrap();
