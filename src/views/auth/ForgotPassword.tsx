
import { Link } from "react-router-dom";
export default function Register() {


  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800">
            Recuperar Contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        <form className="mt-8 space-y-6" >
          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              //value={email}
              //onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Correo electrónico"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enviar enlace de recuperación
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya recuerdas tu contraseña?{" "}
          <br />
          <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
