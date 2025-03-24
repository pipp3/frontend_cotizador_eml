import { useLoaderData, useNavigation } from "react-router-dom";
import { getProductsForClientes } from "../../services/ProductServices";
import { ProductForClientes } from "../../types";
import ProductDetailsClient from "../../components/ProductDetailsClient";

export async function loader(){
  try {
    const products = await getProductsForClientes();
    return products || []; // Retornar un arreglo vacío si products es undefined
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return []; // Retornar un arreglo vacío en caso de error
  }
}

export default function ProductTable() {
  const products = useLoaderData() as ProductForClientes[];
  const navigation = useNavigation();
  
  const isLoading = navigation.state === "loading";

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Catálogo de Productos
        </h1>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="text-center p-10 bg-white bg-opacity-80 rounded-lg shadow">
            <p className="text-indigo-700 text-lg font-medium">Cargando productos...</p>
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center p-8 bg-white bg-opacity-80 rounded-lg shadow">
            <p className="text-indigo-700 text-lg font-medium">No hay productos disponibles</p>
          </div>
        ) : (
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
                    Precio Venta
                  </th>
                  <th className="p-3 text-center font-bold border-b-2 border-blue-400">
                    Disponible
                  </th>
                  <th className="p-3 text-center font-bold border-b-2 border-blue-400">
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <ProductDetailsClient key={product.id} product={product} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 