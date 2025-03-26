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
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Listado de Productos
        </h1>
        <Link
          to="/productos/nuevo"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
        >
          Nuevo Producto
        </Link>
      </div>
      <div className="mt-4">
        <div className="overflow-hidden rounded-lg shadow-xl">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <th className="p-3 text-left font-bold border-b-2 border-blue-400">
                  #
                </th>
                <th className="p-3 text-left font-bold border-b-2 border-blue-400">
                  Nombre
                </th>
                <th className="p-3 text-left font-bold border-b-2 border-blue-400">
                  Precio Compra
                </th>
                <th className="p-3 text-left font-bold border-b-2 border-blue-400">
                  Precio Venta
                </th>
                <th className="p-3 text-center font-bold border-b-2 border-blue-400">
                  Stock
                </th>
                <th className="p-3 text-left font-bold border-b-2 border-blue-400">
                  Ultima Vez Ingresado
                </th>
                <th className="p-3 text-left font-bold border-b-2 border-blue-400">
                  Ultima Vez Actualizado
                </th>
                <th className="p-3 text-left font-bold border-b-2 border-blue-400">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
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
