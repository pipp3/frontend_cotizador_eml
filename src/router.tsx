import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {loader as productsLoader} from "./views/Products";
import NewProduct, {action as newProductAction} from "./views/NewProduct";
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
    ],
  },
]);