import { object, string, number, array } from "valibot";

export const DraftUserSchema = object({
  nombre: string(),
  apellido: string(),
  email: string(),
  password: string(),
  celular: string(),
  ciudad: string(),
});

export const LoginUserSchema = object({
  email: string(),
  password: string(),
});

export const UserSchema = object({
  id: number(),
  nombre: string(),
  apellido: string(),
  email: string(),
  celular: string(),
  ciudad: string(),
  rol: string()
});

export const UsersSchema = array(UserSchema);

export type User = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
  ciudad: string;
  rol: string;
};

export interface UserAuth{
  id:number;
  nombre:string;
  apellido?:string;
  email:string;
  celular?:string;
  ciudad?:string;
  rol:string;
}

export interface AuthResponse {
  success: boolean;
  data?: UserAuth;
  message?: string;
  error?: string;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  error?: string;
}

export interface UpdateProfileRequest {
    nombre?: string;
    apellido?: string;
    ciudad?: string;
    celular?: string;
}

export interface UpdateProfileResponse {
    success: boolean;
    message: string;
    error?: string;
}

export interface DeleteUserResponse {
    success: boolean;
    message: string;
    error?: string;
}

export interface UserData {
  id: number;
  nombre: string;
  apellido: string;
  celular: string;
  ciudad: string;
}

export interface UserDetailsProps {
  user: User;
  index: number;
}

export interface CreateUserRequest {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    celular: string;
    ciudad: string;
    rol: string;
}

export interface CreateUserResponse {
    success: boolean;
    message: string;
    error?: string;
}