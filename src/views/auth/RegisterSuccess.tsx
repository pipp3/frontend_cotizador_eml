

const RegisterSuccess = () => {
  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800">
            Cuenta Creada
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¡Gracias por registrarte en nuestra plataforma!
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <svg
              className="h-16 w-16 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-700 text-lg mb-2">
              Verifica tu correo electrónico
            </p>
            <p className="text-gray-600">
              Hemos enviado un enlace de confirmación a tu correo electrónico.
              Por favor, revisa tu bandeja de entrada y haz clic en el enlace
              para verificar tu cuenta.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Si no encuentras el correo, revisa tu carpeta de spam o correo
                  no deseado.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-center text-sm text-gray-500 mb-4">
              ¿No recibiste el correo de verificación?
            </p>

            <button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Reenviar correo de verificación
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
