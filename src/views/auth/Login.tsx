import React from "react";
import {
  Link,
  Form,
  ActionFunctionArgs,
  redirect,
  useActionData,
} from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { LoginUser } from "../../services/AuthServices";
import ErrorMessage from "../../components/ErrorMessage";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  //console.log(data);
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son requeridos";
    //console.log(error);
  }

  if (error.length) {
    return error;
  }
  try {
    const response = await LoginUser(data);
    if(response && response.success){
      return redirect("/dashboard");
    }
    else{
      return "Error al iniciar sesión. Verifica tus credenciales";
    }
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    return "Error al iniciar sesión. Verifica tus credenciales";
  }
}

export default function Login() {
  const error = useActionData() as string;

  const [showPassword, setShowPassword] = React.useState(false);

  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              to="/registro"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form className="mt-8 space-y-6" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
              <button
                type="button"
                onClick={tooglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeIcon className="h-6 w-6 text-gray-700" />
                ) : (
                  <EyeSlashIcon className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/recuperar-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar Sesión
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
