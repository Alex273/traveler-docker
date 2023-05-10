import { Module, CacheModule } from '@nestjs/common';
const redisStore = require('cache-manager-redis-store');

@Module({
    imports: [CacheModule.register({
        store: redisStore,
        host: 'localhost',
        port: 6379,
    })],
})
export class RedisModule {}
