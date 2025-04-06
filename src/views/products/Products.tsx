import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../../services/ProductServices";
import { Product } from "../../types";
import ProductDetails from "../../components/ProductDetails";

export async function loader() {
  // Cargar los productos sin verificar autenticación
  const products = await getProducts();
  return products;
}

export default function Products() {
  const products = useLoaderData() as Product[];
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-800">
          Listado de Productos
        </h1>
        <Link
          to="/productos/nuevo"
          className="bg-gradient-to-r from-blue-800 to-purple-800 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
        >
          Nuevo Producto
        </Link>
      </div>
      <div className="mt-8">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-800 to-purple-800">
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  #
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Nombre
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Precio Compra
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Precio Venta
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Stock
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Ultima Vez Ingresado
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Ultima Vez Actualizado
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {products.map((product, index) => (
                <ProductDetails key={product.id} product={product} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
