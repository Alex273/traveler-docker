type Role = 'user' | 'admin';

export interface FormValue {
    userPhoto: string[];
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    password: string;
}
