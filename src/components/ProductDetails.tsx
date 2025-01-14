import { Product } from "../types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type ProductDetailsProps = {
  product: Product;
  index: number;
};

export default function ProductDetails({
  product,
  index,
}: ProductDetailsProps) {
  const navigate = useNavigate();
  return (
    <tr className="border-b hover:bg-gray-200 bg-gray-100 border-gray-300">
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700 border-r border-gray-300">
        {index + 1}
      </td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700 border-r border-gray-300">
        {product.nombre}
      </td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700 border-r border-gray-300">
        {product.precio_compra.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}
      </td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700 border-r border-gray-300">
        {product.precio_venta.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}
      </td>
      <td
        className={`px-4 py-2 text-sm text-center font-semibold ${
          product.disponible ? "text-green-500" : "text-red-500"
        } border-r border-gray-300`}
      >
        {product.disponible ? "Sí" : "No"}
      </td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700 border-r border-gray-300">
        {product.ultima_vez_ingresado}
      </td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700 border-r border-gray-300">
        {product.updated_at}
      </td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700 space-x-1">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          onClick={() =>
            navigate(`/productos/${product.id}/editar`, {
              state: {
                product,
              },
            })
          }
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
          <TrashIcon className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
