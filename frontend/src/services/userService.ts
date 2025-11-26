import { api } from "../api/axios";
import type { LoginDto, RegisterDto } from "../types/user.types";

export const userService = {
    register: (data: RegisterDto) => api.post("/users/register", data),
    login: (data: LoginDto) => api.post("/users/login", data),
};
