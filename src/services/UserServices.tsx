import { safeParse } from "valibot";

import axios from "axios";

import { UsersResponse, UsersSchema, User, UpdateProfileRequest, UpdateProfileResponse, DeleteUserResponse, CreateUserRequest, CreateUserResponse } from "../types/users";

export const getUsers = async (): Promise<User[]> => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/user/get-users`;
        const response = await axios.get<UsersResponse>(url, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        if (!response.data.success) {
            throw new Error(response.data.error || "Error al obtener usuarios");
        }

        // Validar la respuesta usando el schema
        const result = safeParse(UsersSchema, response.data.data);
        
        if (!result.success) {
            console.error("Error de validación:", result.issues);
            throw new Error("Error al validar la respuesta del servidor");
        }

        return result.output;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};

export const updateProfile = async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/user/update-profile`;
        const response = await axios.patch<UpdateProfileResponse>(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        if (!response.data.success) {
            throw new Error(response.data.error || "Error al actualizar el perfil");
        }

        return response.data;
    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        throw error;
    }
};

export const deleteUser = async (userId: number): Promise<DeleteUserResponse> => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/user/delete-user/${userId}`;
        const response = await axios.delete<DeleteUserResponse>(url, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        if (!response.data.success) {
            throw new Error(response.data.error || "Error al eliminar el usuario");
        }

        return response.data;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw error;
    }
};

export const createUser = async (data: CreateUserRequest): Promise<CreateUserResponse> => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/user/create-user`;
        const response = await axios.post<CreateUserResponse>(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        if (!response.data.success) {
            throw new Error(response.data.error || "Error al crear el usuario");
        }

        return response.data;
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        throw error;
    }
};



