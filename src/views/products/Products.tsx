import { Link, useLoaderData, redirect } from "react-router-dom";
import { getProducts } from "../../services/ProductServices";
import { Product } from "../../types";
import ProductDetails from "../../components/ProductDetails";
import { isAuthenticated } from "../../services/AuthServices";

export async function loader() {
  // Verificar autenticación antes de cargar los productos
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    return redirect('/');
  }
  
  // Si está autenticado, cargar los productos
  const products = await getProducts();
  return products;
}

export default function Products() {
  const products = useLoaderData() as Product[];
  //console.log(products)
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-sky-700">Listado de Productos</h1>
        <Link
          to="/productos/nuevo"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Nuevo Producto
        </Link>
      </div>
      <div className="mt-4">
        <table className="w-full mt-4 border-collapse border border-gray-300 shadow-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left text-gray-500 font-bold text-sm border-r border-b border-gray-300">
                #
              </th>
              <th className="p-2 text-left text-gray-500 font-bold text-sm border-r border-b border-gray-300">
                Nombre
              </th>
              <th className="p-2 text-left text-gray-500 font-bold text-sm border-r border-b border-gray-300">
                Precio Compra
              </th>
              <th className="p-2 text-left text-gray-500 font-bold text-sm border-r border-b border-gray-300">
                Precio Venta
              </th>
              <th className="p-2 text-left text-gray-500 font-bold text-sm border-r border-b border-gray-300">
                Stock
              </th>
              <th className="p-2 text-left text-gray-500 font-bold text-sm border-r border-b border-gray-300">
                Ultima Vez Ingresado
              </th>
              <th className="p-2 text-left text-gray-500 font-bold text-sm border-r border-b border-gray-300">
                Ultima Vez Actualizado
              </th>
              <th className="p-2 text-left text-gray-500 font-bold text-sm border-r border-b border-gray-300">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <ProductDetails key={product.id} product={product} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
