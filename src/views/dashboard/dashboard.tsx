import { useLoaderData,useNavigate } from "react-router-dom";
import { isAuthenticated,LogoutUser } from "../../services/AuthServices";
import { AuthResponse } from "../../types/users";



export default function Dashboard() {
  const userData = useLoaderData() as AuthResponse;
const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      await LogoutUser();
      navigate("/",{replace:true});
    } catch (error) {
      console.log("Error al cerrar sesion: ",error);
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div>
      <h1 className="text-3xl font-bold text-sky-700 mb-6">
        Bienvenido, {userData.data?.nombre}
      </h1>
      <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v1a1 1 0 102 0V9z" clipRule="evenodd" />
          </svg>
          Cerrar Sesión
        </button>
      </div>
     
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Información de tu cuenta</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-medium">{userData.data?.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Rol:</p>
            <p className="font-medium capitalize">{userData.data?.rol}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">¿Qué puedes hacer?</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Ver tu información personal</li>
            <li>Actualizar tus datos de contacto</li>
            <li>Cambiar tu contraseña</li>
            {userData.data?.rol === "admin" && (
              <li>Acceder al <a href="/productos" className="text-blue-500 hover:underline">panel de administración de productos</a></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function loader() {
    const isAuth = await isAuthenticated();
    return isAuth;
}