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