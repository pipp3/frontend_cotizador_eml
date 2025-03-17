import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import { AuthResponse } from '../types/users'
import { isAuthenticated } from '../services/AuthServices'

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
export async function loader() {
    const isAuth = await isAuthenticated()
    return isAuth

}
