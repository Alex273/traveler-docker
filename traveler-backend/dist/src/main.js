"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
    });
    app.enableCors();
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT');
    await app.listen(PORT);
}
void bootstrap();
//# sourceMappingURL=main.js.map