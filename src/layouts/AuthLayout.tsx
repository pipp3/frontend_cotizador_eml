import { Outlet } from "react-router-dom";
import TransitionLoader from '../components/TransitionLoader';

export default function AuthLayout() {
  return (
    <>
      <TransitionLoader />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Cotizador de Productos EML
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema de administración de productos y cotizaciones
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Outlet />
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} EML. Todos los derechos reservados.
        </footer>
      </div>
    </>
  );
}
