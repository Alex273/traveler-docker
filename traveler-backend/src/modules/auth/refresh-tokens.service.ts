import {Injectable} from '@nestjs/common';

@Injectable()
export class RefreshTokensService {
    async refreshTokens() {
        console.log('Refresh token ====');
    }
}
