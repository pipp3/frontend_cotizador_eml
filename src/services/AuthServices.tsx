import { safeParse } from "valibot";

import axios from "axios";

import { DraftUserSchema, LoginUserSchema } from "../types/users";

type UserData = {
  [key: string]: FormDataEntryValue;
};

export const LoginUser = async (data: UserData) => {
  try {
    const result = safeParse(LoginUserSchema, {
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/auth/login`;
      const response = await axios.post(
        url,
        {
          email: result.output.email,
          password: result.output.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Asegúrate de que se pase en la configuración
        }
      );
      //console.log(response.data)
      return response.data;
    } else {
      throw new Error("Error al validar los datos");
    }
  } catch (error) {
    console.log(error);
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

export const setupAxiosInterceptors = () => {
  axios.defaults.withCredentials = true;
};
