import { useState, useEffect } from "react";
import {
  Link,
  Form,
  ActionFunctionArgs,
  useActionData,
  useSearchParams,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { resetPassword } from "../../services/AuthServices";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

type ActionReturn = {
  success: boolean;
  message: string;
  error?: string;
};

export async function action({
  request,
}: ActionFunctionArgs): Promise<ActionReturn> {
  const formData = await request.formData();
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (newPassword !== confirmPassword) {
    return {
      success: false,
      message: "Las contraseñas no coinciden",
    };
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (!passwordRegex.test(newPassword)) {
    return {
      success: false,
      message: "La contraseña no cumple con los requisitos",
    };
  }
  if (!token) {
    return {
      success: false,
      message: "Token no válido",
    };
  }
  try {
    await resetPassword(newPassword, token);
    return {
      success: true,
      message: "Contraseña actualizada correctamente",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al actualizar la contraseña",
    };
  }
}

const ChangePassword = () => {
  // Estados para controlar la visibilidad de las contraseñas
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const actionData = useActionData() as { success: boolean; message: string };
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
 //console.log(token);
  const [passwordError, setPasswordError] = useState("");
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      setPasswordError("La contraseña no cumple con los requisitos");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!token) {
      toast.error("Token no válido o expirado");
      setTimeout(() => navigate("/"), 3000);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message);
        setTimeout(() => navigate("/"), 3000);
      } else {
        toast.error(actionData.message);
      }
    }
  }, [actionData, navigate]);

  // Función para mostrar/ocultar contraseñas
  const togglePassword = (field: string) => {
    if (field === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative">
        {/* Mostrar loader cuando se está enviando el formulario */}
        {isSubmitting && 
          <Loader 
            fullScreen={true} 
            text="Actualizando contraseña..." 
            type="beat"
            loading={true}
          />
        }
        
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800">
            Cambiar Contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Actualiza tu contraseña para proteger tu cuenta
          </p>
        </div>

        {/* Mensaje de error */}

        <Form className="mt-8 space-y-6" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Nueva contraseña */}
            <div className="relative mb-4">
              <label htmlFor="newPassword" className="sr-only">
                Nueva contraseña
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nueva contraseña"
                onChange={(e) => validatePassword(e.target.value)}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
              <button
                type="button"
                onClick={() => togglePassword("new")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showNewPassword ? (
                  <EyeIcon className="h-6 w-6 text-gray-700" />
                ) : (
                  <EyeSlashIcon className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>

            {/* Confirmar nueva contraseña */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar nueva contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar nueva contraseña"
                required
              />
              <button
                type="button"
                onClick={() => togglePassword("confirm")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showConfirmPassword ? (
                  <EyeIcon className="h-6 w-6 text-gray-700" />
                ) : (
                  <EyeSlashIcon className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Requisitos de contraseña */}
          <div className="bg-gray-50 px-4 py-3 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              La contraseña debe contener:
            </h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-center">
                <svg
                  className="h-4 w-4 text-green-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Mínimo 8 caracteres
              </li>
              <li className="flex items-center">
                <svg
                  className="h-4 w-4 text-green-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Al menos una letra mayúscula
              </li>
              <li className="flex items-center">
                <svg
                  className="h-4 w-4 text-green-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Al menos un carácter especial (!, @, #, etc.)
              </li>
              <li className="flex items-center">
                <svg
                  className="h-4 w-4 text-green-500 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Al menos un número
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isSubmitting 
                  ? "bg-indigo-400 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {isSubmitting ? "Procesando..." : "Actualizar contraseña"}
            </button>
          </div>
        </Form>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
