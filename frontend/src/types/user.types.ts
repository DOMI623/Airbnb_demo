// src/types/user.types.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    token?: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}
