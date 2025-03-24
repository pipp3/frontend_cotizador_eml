import { ProductForClientes } from "../types";
import { useState } from "react";

type ProductDetailsProps = {
  product: ProductForClientes;
  index: number;
};

export default function ProductDetailsClient({
  product,
  index,
}: ProductDetailsProps) {
  const [cantidad, setCantidad] = useState(0);

  const incrementar = () => {
    setCantidad(prevCantidad => prevCantidad + 1);
  };

  const decrementar = () => {
    setCantidad(prevCantidad => (prevCantidad > 0 ? prevCantidad - 1 : 0));
  };

  // Color alternado para filas pares e impares
  const bgColor = index % 2 === 0 ? "bg-indigo-50" : "bg-white";

  return (
    <tr className={`${bgColor} hover:bg-purple-50 transition-colors duration-150 ease-in-out`}>
      <td className="p-3 text-left font-medium text-gray-700 border-b border-indigo-100">
        {index + 1}
      </td>
      <td className="p-3 text-left font-medium text-gray-700 border-b border-indigo-100">
        {product.nombre}
      </td>
      
      <td className="p-3 text-left font-medium text-blue-700 border-b border-indigo-100">
        {product.precio_venta.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}
      </td>
      <td
        className={`p-3 text-center font-semibold border-b border-indigo-100 ${
          product.disponible ? "text-green-600" : "text-rose-600"
        }`}
      >
        {product.disponible ? (
          <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs">
            Disponible
          </span>
        ) : (
          <span className="bg-rose-100 text-rose-600 py-1 px-3 rounded-full text-xs">
            No disponible
          </span>
        )}
      </td>
      <td className="p-3 text-center border-b border-indigo-100">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={decrementar}
            disabled={cantidad === 0}
            className={`bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold px-3 py-1 rounded-md shadow transition-all duration-200 ${
              cantidad === 0 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
            }`}
          >
            -1
          </button>
          <span className="mx-2 font-bold text-indigo-700 w-10 text-center bg-indigo-50 py-1 px-2 rounded-md">
            {cantidad}
          </span>
          <button
            onClick={incrementar}
            disabled={!product.disponible}
            className={`bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold px-3 py-1 rounded-md shadow transition-all duration-200 ${
              !product.disponible 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
            }`}
          >
            +1
          </button>
        </div>
      </td>
    </tr>
  );
}
