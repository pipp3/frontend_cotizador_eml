import { Outlet, useLoaderData, Navigate } from 'react-router-dom'
import { AuthResponse } from '../types/users'
import { isAuthenticated } from '../services/AuthServices'
import { createContext, useContext } from 'react'

// Crear un contexto para la autenticación
export const AuthContext = createContext<AuthResponse['data'] | null>(null);

// Hook personalizado para acceder al contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    // No lanzamos error si no hay contexto, simplemente devolvemos null
    // Esto permite usar el hook en componentes fuera del ProtectedRoute
    return context;
};

const ProtectedRoute = ({requiredRole}:{requiredRole?:string}) => {
    const isAuth = useLoaderData() as AuthResponse
    
    // Si el usuario no está autenticado, redirigir al login
    if (!isAuth.success) {
        //console.log("No está autenticado")
        return <Navigate to="/" replace />
    }
    
    // Si se requiere un rol específico y el usuario no lo tiene, redirigir al login
    if (requiredRole && isAuth.data && isAuth.data.rol !== requiredRole) {
        //console.log("No tiene el rol requerido")
        return <Navigate to="/" replace />
    }
    
    // Si el usuario está autenticado y tiene el rol correcto, mostrar las rutas hijas
    //console.log("Está autenticado y tiene el rol correcto: ", isAuth.data?.rol)
    return (
        <AuthContext.Provider value={isAuth.data}>
            <Outlet />
        </AuthContext.Provider>
    )
}

export default ProtectedRoute

// Loader que verifica la autenticación real
export const loader = async () => {
    try {
        const authResponse = await isAuthenticated()
        return authResponse
    } catch (error: any) {
        // Si es un error 401, devolvemos un objeto que indica que no está autenticado
        if (error.response?.status === 401) {
            return {
                success: false,
                data: null,
                message: 'No autenticado'
            }
        }
        // Para otros errores, también indicamos que no está autenticado
        return {
            success: false,
            data: null,
            message: 'Error de conexión'
        }
    }
}
