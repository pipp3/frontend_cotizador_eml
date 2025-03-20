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
      withCredentials: true, // Asegurarnos de que acepte cookies
    });

    // No necesitamos guardar tokens en localStorage si están en cookies
    // Podemos guardar información del usuario si lo necesitamos
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

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

export const isAuthenticated = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/verify`;
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "No autenticado",
    };
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

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

export const refreshToken = async () => {
  try {
    const refreshToken = getCookie("refresh_token");

    if (!refreshToken) {
      throw new Error("No se encontró refresh token en las cookies");
    }

    const url = `${import.meta.env.VITE_API_URL}/auth/refresh-token`;
    const response = await axios.post(
      url,
      { refresh_token: refreshToken },
      { withCredentials: true }
    );

    const { success, data } = response.data;

    if (!success || !data?.access_token) {
      throw new Error("El servidor no proporcionó un nuevo token");
    }

    return data.access_token;
  } catch (error: any) {
    let errorMsg = "Error desconocido al refrescar el token";

    if (axios.isAxiosError(error)) {
      errorMsg = `Error ${error.response?.status}: ${
        error.response?.data?.message || "Sin mensaje"
      }`;
    } else if (error instanceof Error) {
      errorMsg = error.message;
    }

    console.error("Error refrescando token:", errorMsg);
    throw new Error(errorMsg);
  }
};

export const setupAxiosInterceptors = () => {
  let isRefreshing = false;
  let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> = [];

  // Función optimizada para obtener cookies
  const getCookie = (name: string) => 
    Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')))[name] || null;

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
      error ? prom.reject(error) : prom.resolve(token);
    });
    failedQueue = [];
  };

  // Verificar si estamos en la página de token expirado
  const isInTokenExpiredPage = () => window.location.pathname === '/token-expirado';

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // No intentar refrescar si ya estamos en la página de token expirado
      if (isInTokenExpiredPage()) return Promise.reject(error);

      // Si es un error 401 y no es una solicitud de refresh token
      if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh-token')) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => axios(originalRequest))
            .catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = getCookie('refresh_token');
          if (!refreshToken) throw new Error('No se encontró refresh token');

          const refreshResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
            { refresh_token: refreshToken },
            { withCredentials: true }
          );

          if (!refreshResponse.data.success || !refreshResponse.data.data?.access_token) {
            throw new Error('Error en la respuesta del servidor al refrescar el token');
          }

          processQueue(null, refreshResponse.data.data.access_token);
          return axios(originalRequest);
        } catch (refreshError: any) {
          processQueue(refreshError);
          localStorage.removeItem('user');

          // Construir mensaje de error
          let errorMsg = 'Error desconocido al refrescar el token';
          if (axios.isAxiosError(refreshError)) {
            errorMsg = `Error ${refreshError.response?.status}: ${refreshError.response?.data?.message || 'Sin mensaje'}`;
          } else if (refreshError instanceof Error) {
            errorMsg = refreshError.message;
          }

          window.location.href = `/token-expirado?error=${encodeURIComponent(errorMsg)}`;
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};