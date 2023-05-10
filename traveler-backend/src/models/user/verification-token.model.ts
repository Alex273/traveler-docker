import {Column, Model, Table} from 'sequelize-typescript';

@Table
export class VerificationToken extends Model {
    @Column
    userEmail!: string;

    @Column
    token!: string;
}
