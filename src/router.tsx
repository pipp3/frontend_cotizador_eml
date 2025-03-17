import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute,{loader as authLoader} from "./components/ProtectedRoute";

import Products, {loader as productsLoader} from "./views/products/Products";
import NewProduct, {action as newProductAction} from "./views/products/NewProduct";
import EditProduct, {action as editProductAction,loader as editProductLoader} from "./views/products/EditProduct";
import {action as deleteProduct} from "./components/ProductDetails";

import { setupAxiosInterceptors } from "./services/AuthServices";

// Auth component
import Login,{action as loginUser} from "./views/auth/Login";
import Register,{action as registerUser} from "./views/auth/Register";
import ForgotPassword from "./views/auth/ForgotPassword";
import ConfirmAccount, { loader as confirmAccountLoader } from "./views/auth/ConfirmAccount";
import RegisterSuccess from "./views/auth/RegisterSuccess";
import ChangePassword from "./views/auth/ChangePassword";

//Dashboard component
import Dashboard,{loader as dashboardLoader} from "./views/dashboard/dashboard";

setupAxiosInterceptors();

export const Router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedRoute requiredRole="cliente" />,
    loader: authLoader,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            loader: dashboardLoader
          }
        ]
      }
    ]
  },
  {
    path: "/productos",
    element: <ProtectedRoute requiredRole="admin" />,
    loader: authLoader,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            path: "/productos/",
            element: <Products />,
            loader: productsLoader
          },
          {
            path: "/productos/nuevo",
            element: <NewProduct />,
            action: newProductAction
          },
          {
            path: "/productos/:id/editar",
            element: <EditProduct />,
            action: editProductAction,
            loader: editProductLoader
          },
          {
            path:"/productos/:id/eliminar",
            action: deleteProduct
          }
        ]
      }
     
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Login />,
        action: loginUser
      },
      {
        path: "/registro",
        element: <Register />,
        action: registerUser
      },
      {
        path:"/registro-exitoso",
        element: <RegisterSuccess />,

      },
      {
        path: "/recuperar-password",
        element: <ForgotPassword />,
      },
      {
        path: "/cambiar-password",
        element: <ChangePassword />,
      },
      {
        path: "/confirmar-cuenta",
        element: <ConfirmAccount />,
        loader: confirmAccountLoader
      }
      
    ]
  }
]);