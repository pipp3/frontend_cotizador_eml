import { Product } from "../types"

type ProductDetailsProps = {
    product:Product
}

export default function ProductDetails({product}:ProductDetailsProps) {
  return (
    <tr className="border-b hover:bg-gray-200 bg-gray-100 border-gray-300">
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700">{product.id}</td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700">{product.nombre}</td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700">{product.precio_bruto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700">{product.precio_venta.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
      <td
        className={`px-4 py-2 text-sm text-center font-semibold ${
          product.disponible ? "text-green-500" : "text-red-500"
        }`}
      >
        {product.disponible ? "Sí" : "No"}
      </td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700">{product.ultima_vez_ingresado}</td>
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700">{product.updated_at}</td>
    </tr>
  )
}
