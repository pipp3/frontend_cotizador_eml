
import { Link,Form,useActionData, ActionFunctionArgs,useNavigation } from "react-router-dom";
import { forgotPassword } from "../../services/AuthServices";
import {toast} from "react-toastify";
import{useEffect} from "react";

export async function action({request}:ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  try {
   await forgotPassword(email);
    return{
      success:true,
      message:"Se ha enviado un enlace de recuperación a tu correo"
    }
  } catch (error:any) {
    return{
      success:false,
      message:error.message || "Error al enviar el enlace de recuperación"
    
  }
}
}
export default function ForgotPassword() {
const actionData = useActionData() as { success: boolean; message: string } | undefined;
const navigation = useNavigation();
const isSubmitting=navigation.state==="submitting"
useEffect(()=>{
  if(actionData){
    if(actionData.success){
      toast.success(actionData.message,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else{
      toast.error(actionData.message,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
},[actionData])
  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800">
            Recuperar Contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        <Form className="mt-8 space-y-6" method="POST">
          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              //value={email}
              //onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Correo electrónico"
            />
          </div>

          <div>
          <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isSubmitting ? "Enviando..." : "Enviar enlace de recuperación"}
            </button>
          </div>
        </Form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya recuerdas tu contraseña?{" "}
          <br />
          <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
