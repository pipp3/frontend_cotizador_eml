import { useState, useEffect } from "react";
import {
  Link,
  Form,
  ActionFunctionArgs,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import ErrorMessage from "../../components/ErrorMessage";
import { RegisterUser } from "../../services/AuthServices";
import Loader from "../../components/Loader";

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

  // Verificar que las contraseñas coincidan
  if (data.password !== data.confirmPassword) {
    error = "Las contraseñas no coinciden";
  }

  if (error.length) {
    return error;
  }

  if (
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      data.password as string
    )
  ) {
    error =
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial";
  }
  if (error.length) {
    return error;
  }
  if (!/^[a-zA-Z]+$/.test(data.nombre as string)) {
    error = "El nombre solo puede contener letras";
  }
  if (error.length) {
    return error;
  }
  if (!/^[a-zA-Z]+$/.test(data.apellido as string)) {
    error = "El apellido solo puede contener letras";
  }
  if (error.length) {
    return error;
  }
  if (!/^[a-zA-Z]+$/.test(data.ciudad as string)) {
    error = "La ciudad solo puede contener letras";
  }
  if (error.length) {
    return error;
  }
  if (!/^9\d{8}$/.test(data.celular as string)) {
    error = "El celular debe tener 9 dígitos y empezar con 9";
  }
  if (error.length) {
    return error;
  }
  if (
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
      data.email as string
    )
  ) {
    error = "El email no es válido";
  }
  if (error.length) {
    return error;
  }

  try {
    // Eliminar confirmPassword antes de enviar los datos
    const { confirmPassword, ...dataToSend } = data;
    await RegisterUser(dataToSend);
    
    // Devolver un objeto que indique éxito y la necesidad de redirección
    return {
      success: true,
      message: "Registro exitoso",
      shouldRedirect: true
    };
  } catch (error: any) {
    return error.message || "Error al registrar el usuario";
  }
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData() as any;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Función para obtener el texto del loader
  const getLoaderText = () => {
    return "Procesando registro...";
  };

  // Efecto para manejar la redirección
  useEffect(() => {
    if (actionData && typeof actionData === 'object' && actionData.success && actionData.shouldRedirect) {
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        window.location.href = "/registro-exitoso";
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [actionData]);

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Mostrar loader cuando se está enviando el formulario o redirigiendo */}
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
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        {typeof actionData === 'string' && <ErrorMessage>{actionData}</ErrorMessage>}
        <Form className="mt-8 space-y-6" method="POST">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-indigo-700">
              Información Personal
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
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="given-name"
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nombre"
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
                  id="apellido"
                  name="apellido"
                  type="text"
                  autoComplete="family-name"
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Apellido"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
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
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  autoComplete="address-level2"
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Ciudad"
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
                  id="celular"
                  name="celular"
                  type="tel"
                  autoComplete="tel"
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Celular (9XXXXXXXX)"
                />
              </div>
            </div>
          </div>

          {/* Contraseña */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-indigo-700">Seguridad</h3>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-700" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              </div>
              {passwordFocus && (
                <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    La contraseña debe contener:
                  </p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>• Al menos 8 caracteres</li>
                    <li>• Al menos una letra mayúscula (A-Z)</li>
                    <li>• Al menos una letra minúscula (a-z)</li>
                    <li>• Al menos un número (0-9)</li>
                    <li>• Al menos un carácter especial (@$!%*?&)</li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Contraseña
              </label>
              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirmar contraseña"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-700" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
