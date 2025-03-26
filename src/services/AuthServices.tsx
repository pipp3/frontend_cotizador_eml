import { safeParse } from "valibot";

import axios from "axios";

import { DraftUserSchema } from "../types/users";

type UserData = {
  [key: string]: FormDataEntryValue;
};

export const LoginUser = async (data: any) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/login`;
    const response = await axios.post(url, data, {
      withCredentials: true,
    });
    
    return response.data;
  } catch (error) {
    console.error("Error en LoginUser:", error);
    throw error;
  }
};

export const LogoutUser = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/logout`;
    await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const RegisterUser = async (data: UserData) => {
  try {
    const result = safeParse(DraftUserSchema, {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      password: data.password,
      celular: data.celular,
      ciudad: data.ciudad,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/auth/register`;
      await axios.post(url, {
        headers: {
          "Content-Type": "application/json",
        },
        nombre: result.output.nombre,
        apellido: result.output.apellido,
        email: result.output.email,
        password: result.output.password,
        celular: result.output.celular,
        ciudad: result.output.ciudad,
      });
    } else {
      throw new Error("Error al validar los datos");
    }
  } catch (error) {
    console.log(error);
  }
};

export const confirmAccount = async (token: string) => {
  try {
    const url = `${
      import.meta.env.VITE_API_URL
    }/auth/verify-email?token=${token}`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.error || "Error al confirmar la cuenta"
      );
    }
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/forgot-password`;
    const response = await axios.post(url, {
      email,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.error ||
          "Error al solicitar el restablecimiento de contraseña"
      );
    }
    throw error;
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    const url = `${
      import.meta.env.VITE_API_URL
    }/auth/reset-password?token=${token}`;
    const response = await axios.post(url, {
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.error || "Error al restablecer la contraseña"
      );
    }
    throw error;
  }
};

// Variable para controlar el estado de redirección
let isRedirecting = false;

export const setupAxiosInterceptors = () => {
  // Interceptor para respuestas
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Rutas públicas que no requieren autenticación
      const publicRoutes = [
        '/',
        '/registro',
        '/recuperar-password',
        '/confirmar-cuenta',
        '/cambiar-password',
        '/token-expirado',
        '/registro-exitoso'
      ];

      // Verificar si estamos en una ruta pública
      const isPublicRoute = publicRoutes.some(route => 
        window.location.pathname === route || window.location.pathname === route + '/'
      );

      // Si es un error 401, no estamos en una ruta pública y no estamos ya redirigiendo
      if (error.response?.status === 401 && !isPublicRoute && !isRedirecting) {
        isRedirecting = true;
        
       
        // Redirigir a la ruta principal
        window.location.href = '/';
      }

      return Promise.reject(error);
    }
  );
};

// Modificar isAuthenticated para usar el interceptor
export const isAuthenticated = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/verify`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    // No manejamos el error 401 aquí, lo dejamos para el interceptor
    if (error.response?.status !== 401) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.error || "Error de conexión"
      };
    }
    throw error;
  }
};

