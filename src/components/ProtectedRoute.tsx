import { Outlet, useLoaderData, Navigate } from 'react-router-dom'
import { AuthResponse } from '../types/users'
import { isAuthenticated } from '../services/AuthServices'

const ProtectedRoute = ({requiredRole}:{requiredRole?:string}) => {
    const isAuth = useLoaderData() as AuthResponse
    
    // Si el usuario no está autenticado, redirigir al login
    if (!isAuth.success) {
        return <Navigate to="/" replace />
    }
    
    // Si se requiere un rol específico y el usuario no lo tiene, redirigir al login
    if (requiredRole && isAuth.data && isAuth.data.rol !== requiredRole) {
        return <Navigate to="/" replace />
    }
    
    // Si el usuario está autenticado y tiene el rol correcto, mostrar las rutas hijas
    return <Outlet />
}

export default ProtectedRoute

// Loader que verifica la autenticación real
export const loader = async () => {
    try {
        const authResponse = await isAuthenticated()
        return authResponse
    } catch (error) {
        // En caso de error, devolver un objeto que indique que no está autenticado
        return {
            success: false,
            data: null,
            message: 'No autenticado'
        }
    }
}
