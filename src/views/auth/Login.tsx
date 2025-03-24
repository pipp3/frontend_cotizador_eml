import { useState, useEffect } from "react";
import {
  Link,
  Form,
  ActionFunctionArgs,
  useActionData,
  useNavigation,
  useSearchParams,

} from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { LoginUser } from "../../services/AuthServices";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";

// Loader simplificado sin verificación de autenticación
export async function loader() {
  // Simplemente continuar con la página de login
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son requeridos";
  }

  if (error.length) {
    return error;
  }
  
  try {
    const response = await LoginUser(data);
    if(response && response.success){
      // Retornar objeto con información que será utilizada por el componente
      return {
        success: true, 
        message: "Inicio de sesión exitoso",
        shouldRedirect: true
      };
    } else {
      return "Error al iniciar sesión. Verifica tus credenciales";
    }
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    return "Error al iniciar sesión. Verifica tus credenciales";
  }
}

export default function Login() {
  const actionData = useActionData() as any;
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isSubmitting = navigation.state === "submitting";
  
  useEffect(() => {
    if (actionData?.success && actionData?.shouldRedirect) {
      setIsRedirecting(true);
      setTimeout(() => {
        window.location.href = '/productos';
      }, 1500);
    }
  }, [actionData]);

  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  // Determinar el texto del loader basado en el estado actual
  const getLoaderText = () => {
    return "Iniciando sesión...";
  };
  

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative">
        {(isSubmitting || isRedirecting) && 
          <Loader 
            fullScreen={true} 
            text={getLoaderText()} 
            type="pulse" 
            loading={true} 
          />
        }
        
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
        
        {message && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
            {message}
          </div>
        )}
        
        {typeof actionData === 'string' && <ErrorMessage>{actionData}</ErrorMessage>}
        
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
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isSubmitting 
                  ? "bg-indigo-400 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {isSubmitting ? "Procesando..." : "Iniciar Sesión"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
