import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate, useActionData, Form } from "react-router-dom";
import { createUser } from "../../services/UserServices";
import { CreateUserRequest } from "../../types/users";
import ErrorMessage from "../../components/ErrorMessage";


export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const confirmPassword = formData.get('confirmPassword') as string;
  const password = formData.get('password') as string;

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden" };
  }

  // Validar formato de contraseña
  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    return { error: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial" };
  }

  const userData: CreateUserRequest = {
    nombre: formData.get('nombre') as string,
    apellido: formData.get('apellido') as string,
    email: formData.get('email') as string,
    password: password,
    celular: formData.get('celular') as string,
    ciudad: formData.get('ciudad') as string,
    rol: formData.get('rol') as string
  };

  try {
    await createUser(userData);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Error al crear el usuario" };
  }
}

const NewUser: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  React.useEffect(() => {
    if (actionData?.success) {
      navigate("/administrar-usuarios");
    }
  }, [actionData, navigate]);

  return (
    <div className="flex items-center justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800">
            Crear Nuevo Usuario
          </h2>
        </div>

        {actionData?.error && <ErrorMessage>{actionData.error}</ErrorMessage>}

        <Form method="post" className="mt-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-indigo-700">
              Información del Usuario
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  autoComplete="given-name"
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nombre"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="apellido"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  autoComplete="family-name"
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Apellido"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="ciudad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ciudad
                </label>
                <input
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  autoComplete="address-level2"
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Ciudad"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="celular"
                  className="block text-sm font-medium text-gray-700"
                >
                  Celular
                </label>
                <input
                  type="tel"
                  id="celular"
                  name="celular"
                  autoComplete="tel"
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Celular (9XXXXXXXX)"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="new-password"
                    className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirmar contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="rol"
                className="block text-sm font-medium text-gray-700"
              >
                Rol
              </label>
              <select
                id="rol"
                name="rol"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              >
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="cliente">Cliente</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => navigate("/administrar-usuarios")}
              type="button"
              className="group relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="group relative w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Crear Usuario
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewUser;
