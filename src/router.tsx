import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {loader as productsLoader} from "./views/Products";
import NewProduct, {action as newProductAction} from "./views/NewProduct";
import EditProduct, {action as editProductAction,loader as editProductLoader} from "./views/EditProduct";
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/",
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
    ],
  },
]);