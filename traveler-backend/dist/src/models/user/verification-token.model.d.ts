import { Model } from 'sequelize-typescript';
export declare class VerificationToken extends Model {
    userEmail: string;
    token: string;
}
