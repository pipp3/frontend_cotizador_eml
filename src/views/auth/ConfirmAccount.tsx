import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import { confirmAccount } from '../../services/AuthServices';

import SuccessConfirmation from './SuccessConfirmation';
import ExpiredToken from './ExpiredToken';

type ConfirmResponse = {
    success: boolean;
    message: string;
    error?: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    
    if (!token) {
        return { 
            success: false, 
            error: 'Token no proporcionado',
            message: 'No se encontró el token de verificación' 
        };
    }

    try {
        const response = await confirmAccount(token);
        return response;
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            message: error.message || 'Error al verificar la cuenta'
        };
    }
}

export default function ConfirmAccount() {
    const { success, message, error } = useLoaderData() as ConfirmResponse;

    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {success ? <SuccessConfirmation /> : <ExpiredToken message={error || message} />}
            </div>
        </div>
    );
}
