export declare enum Role {
    user = "user",
    admin = "admin"
}
export interface UserRecord {
    userId: number;
    userPhoto: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
}
export interface JwtPayload {
    sub: string;
    role: string;
    iat: number;
    exp: number;
}
