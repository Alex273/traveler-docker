import {Column, Model, Table, AllowNull} from 'sequelize-typescript';

@Table
export class User extends Model {
    @AllowNull(true)
    @Column
    userPhoto: string;

    @Column
    email!: string;

    @Column
    firstName!: string;

    @Column
    lastName!: string;

    @Column
    role!: string;

    @Column({defaultValue: false})
    isActive!: boolean;

    @Column
    password!: string;
}
