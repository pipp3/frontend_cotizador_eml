import { useState } from "react";
import { Link, Form } from "react-router-dom";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
const ChangePassword = () => {
  // Estados para controlar la visibilidad de las contraseñas
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800">
            Cambiar Contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Actualiza tu contraseña para proteger tu cuenta
          </p>
        </div>

        {/* Mensaje de error */}

        <Form className="mt-8 space-y-6">
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
                required
              />
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Actualizar contraseña
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
