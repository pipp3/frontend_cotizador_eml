import { Link } from 'react-router-dom';

interface ExpiredTokenProps {
  message?: string;
}

const ExpiredToken = ({ message }: ExpiredTokenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-lg">
        <div className="text-5xl text-yellow-500 mb-4">
          <span role="img" aria-label="warning">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Sesión expirada</h1>
        <p className="text-gray-600 mb-6">
          {message || "Tu sesión ha caducado o el token de autenticación ya no es válido. Por razones de seguridad, es necesario que inicies sesión nuevamente."}
        </p>
        
        <Link 
          to="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition inline-block"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
};

export default ExpiredToken;