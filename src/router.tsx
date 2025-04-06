import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute,{loader as authLoader} from "./components/ProtectedRoute";


import Products, {loader as productsLoader} from "./views/products/Products";
import NewProduct, {action as newProductAction} from "./views/products/NewProduct";
import EditProduct, {action as editProductAction,loader as editProductLoader} from "./views/products/EditProduct";
import {action as deleteProduct} from "./components/ProductDetails";

import ManageUsers, {loader as usersLoader} from "./views/users/ManageUsers";
import NewUser, {action as newUserAction} from "./views/users/NewUser";

import { setupAxiosInterceptors } from "./services/AuthServices";

// Auth component
import Login,{action as loginUser, loader as loginLoader} from "./views/auth/Login";
import Register,{action as registerUser} from "./views/auth/Register";
import ForgotPassword,{action as forgotPasswordAction} from "./views/auth/ForgotPassword";
import ConfirmAccount, { loader as confirmAccountLoader } from "./views/auth/ConfirmAccount";
import RegisterSuccess from "./views/auth/RegisterSuccess";
import ChangePassword,{action as changePasswordAction} from "./views/auth/ChangePassword";

//Dashboard component
//import Dashboard from "./views/dashboard/dashboard";
import ExpiredToken from "./views/auth/ExpiredToken";
import ProductTable,{loader as productTableLoader} from "./views/products/ProductTable";
import OrdersView from "./views/orders/OrdersView";
import CartView from "./views/cart/CartView";
import {OrderDetailView} from "./views/OrderDetailView";

import Me from "./views/users/Me";

import NotFound from "./views/NotFound";

import AdminOrdersView from "./views/admin/AdminOrdersView";

import ContactView from "./views/ContactView";


setupAxiosInterceptors();

export const Router = createBrowserRouter([
  {
    path: "/productos",
    element: <ProtectedRoute />,
    loader: authLoader,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <ProductTable />,
            loader: productTableLoader
          }
        ]
      }
    ]
  },
  {
    path: "/pedidos",
    element: <ProtectedRoute />,
    loader: authLoader,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <OrdersView />
          },
          {
            path: ":id",
            element: <OrderDetailView />
          }
        ]
      }
    ]
  },
  {
    path: "/pedidos-admin",
    element: <ProtectedRoute requiredRole="admin" />,
    loader: authLoader,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <AdminOrdersView />
          },
          {
            path: "/pedidos-admin/:id",
            element: <OrderDetailView />
          },
         
        ]
      }
    ]
  },
  {
    path: "/productos-admin",
    element: <ProtectedRoute requiredRole="admin" />,
    loader: authLoader,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            path: "/productos-admin/",
            element: <Products />,
            loader: productsLoader
          },
          {
            path: "/productos-admin/nuevo",
            element: <NewProduct />,
            action: newProductAction
          },
          {
            path: "/productos-admin/:id/editar",
            element: <EditProduct />,
            action: editProductAction,
            loader: editProductLoader
          },
          {
            path:"/productos-admin/:id/eliminar",
            action: deleteProduct
          }
        ]
      }
     
    ],
  },
  {
    path: "/perfil",
    element: <ProtectedRoute />,
    loader: authLoader,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Me />
          }
        ]
      }
    ]
  },
  {
    path: "/contacto",
    element: <ProtectedRoute />,
    loader: authLoader,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <ContactView />
          }
        ]
      }
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Login />,
        action: loginUser,
        loader: loginLoader,
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
        action: forgotPasswordAction
      },
      {
        path: "/cambiar-password",
        element: <ChangePassword />,
        action: changePasswordAction

      },
      {
        path: "/confirmar-cuenta",
        element: <ConfirmAccount />,
        loader: confirmAccountLoader
      },
      {
        path: "/token-expirado",
        element: <ExpiredToken />,
        handle: { preventAuthRedirect: true }
      },
      
      
    ]
  },
  {
    path: "/administrar-usuarios",
    element: <ProtectedRoute requiredRole="admin" />,
    loader: authLoader,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <ManageUsers />,
            loader: usersLoader
          },
          {
            path: "/administrar-usuarios/nuevo",
            element: <NewUser />,
            action: newUserAction
          }
          
        ]
      }
    ]
  },
  {
    path: "carrito",
    element: <CartView />,
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

