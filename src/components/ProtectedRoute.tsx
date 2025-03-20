import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import { AuthResponse } from '../types/users'
import { isAuthenticated } from '../services/AuthServices'
import { redirect } from 'react-router-dom'

const ProtectedRoute = ({requiredRole}:{requiredRole?:string}) => {
    const isAuth = useLoaderData() as AuthResponse
    //console.log(isAuth)
    //console.log(isAuth.success)
    //console.log(requiredRole)
    if (!isAuth || !isAuth.success) {
        // Redirigir al login si no está autenticado
        return <Navigate to="/" replace />
    }
    if (requiredRole && isAuth.data?.rol !== requiredRole) {
        return <Navigate to="/dashboard" replace />
    }
    // Si está autenticado, renderizar las rutas hijas
    return <Outlet />
}

export default ProtectedRoute

// Loader para verificar autenticación
export const loader = async () => {
    try {
        // Llamar a la función isAuthenticated para verificar con el backend
        // Como las cookies se envían automáticamente, no necesitamos extraer el token
        const authResponse = await isAuthenticated();
        
        if (!authResponse.success) {
            return redirect('/');
        }
        
        return authResponse;
    } catch (error) {
        console.error("Error verificando autenticación:", error);
        return redirect('/token-expirado');
    }
}
