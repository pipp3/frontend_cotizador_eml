import { Link } from 'react-router-dom';

interface ExpiredTokenProps {
    message: string;
}

export default function ExpiredToken({ message }: ExpiredTokenProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
                <svg
                    className="h-16 w-16 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            <div className="text-center mb-6">
                <p className="text-gray-700 text-lg mb-2">Error de Verificación</p>
                <p className="text-gray-600">
                    {message}
                </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <p className="text-center text-sm text-gray-500 mb-4">
                    ¿Qué deseas hacer?
                </p>

                <div className="flex flex-col space-y-3">
                    <Link 
                        to="/registro"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Volver al Registro
                    </Link>

                    <Link 
                        to="/"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Ir a Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}