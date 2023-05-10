import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    userPhoto: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    password: string;
}
