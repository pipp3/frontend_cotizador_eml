import { Link } from 'react-router-dom';

export default function SuccessConfirmation() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
                <svg
                    className="h-16 w-16 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            <div className="text-center mb-6">
                <p className="text-gray-700 text-lg mb-2">¡Felicitaciones!</p>
                <p className="text-gray-600">
                    Tu cuenta ha sido verificada correctamente. Ahora puedes acceder a
                    todos los servicios de nuestra plataforma.
                </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <p className="text-center text-sm text-gray-500 mb-4">
                    ¿Qué deseas hacer ahora?
                </p>

                <div className="flex flex-col space-y-3">
                    <Link 
                        to="/"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Ir a Iniciar Sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}