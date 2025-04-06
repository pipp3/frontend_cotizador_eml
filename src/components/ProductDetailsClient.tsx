import { ProductForClientes } from "../types";
import { useState, useEffect } from "react";
import { useCartStore } from "../store/useCartStore";

type ProductDetailsProps = {
  product: ProductForClientes;
  index: number;
};

export default function ProductDetailsClient({
  product,
  index,
}: ProductDetailsProps) {
  const [cantidad, setCantidad] = useState(0);
  const { items, addItem, updateQuantity } = useCartStore();

  // Sincronizar la cantidad con el carrito cuando cambie
  useEffect(() => {
    const cartItem = items.find(item => item.product.id === product.id);
    if (cartItem) {
      setCantidad(cartItem.quantity);
    }
  }, [items, product.id]);

  const incrementar = () => {
    const newCantidad = cantidad + 1;
    setCantidad(newCantidad);
    if (cantidad === 0) {
      addItem(product, 1);
    } else {
      updateQuantity(product.id, newCantidad);
    }
  };

  const decrementar = () => {
    if (cantidad > 0) {
      const newCantidad = cantidad - 1;
      setCantidad(newCantidad);
      if (newCantidad === 0) {
        updateQuantity(product.id, 0);
      } else {
        updateQuantity(product.id, newCantidad);
      }
    }
  };

  // Color alternado para filas pares e impares
  const bgColor = index % 2 === 0 ? "bg-white" : "bg-white";

  return (
    <tr className="hover:bg-blue-50 transition-colors duration-200">
      <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
        {index + 1}
      </td>
      <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
        {product.nombre}
      </td>
      
      <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
        {product.precio_venta.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}
      </td>
      <td className="p-3 text-sm text-center font-medium text-gray-700 border-r border-blue-100">
        {product.disponible ? (
          <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-semibold">
            Disponible
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-xs font-semibold">
            No disponible
          </span>
        )}
      </td>
      <td className="p-3 text-sm text-center font-medium text-gray-700">
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
