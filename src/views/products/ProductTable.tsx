import { useLoaderData, useNavigation, redirect } from "react-router-dom";
import { getProductsForClientes } from "../../services/ProductServices";
import { ProductForClientes } from "../../types";
import { isAuthenticated } from "../../services/AuthServices";
import ProductDetailsClient from "../../components/ProductDetailsClient";
//import { AuthResponse } from "../../types/users";

// Cache para los productos
let productsCache: ProductForClientes[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

export async function loader() {
  try {
    const authResponse = await isAuthenticated();
    if (!authResponse.success) {
      return redirect("/");
    }

    // Verificar si hay datos en caché y si no han expirado
    if (productsCache && Date.now() - lastFetchTime < CACHE_DURATION) {
      return productsCache;
    }

    const products = await getProductsForClientes();
    if (products) {
      productsCache = products;
      lastFetchTime = Date.now();
    }
    return products || []; 
  } catch (error: any) {
    // Si es un error 401, no intentamos usar el caché
    if (error.response?.status === 401) {
      throw error;
    }
    // Para otros errores, intentamos usar el caché si existe
    if (productsCache) {
      return productsCache;
    }
    return []; 
  }
}

const TableSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded mb-4"></div>
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 bg-gray-200 rounded"></div>
      ))}
    </div>
  </div>
);

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
          <div className="bg-white p-6 rounded-lg shadow">
            <TableSkeleton />
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