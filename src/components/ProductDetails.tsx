import { Product } from "../types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionFunctionArgs, Form, redirect, useNavigate } from "react-router-dom";
import { deleteProduct } from "../services/ProductServices";
import Swal from "sweetalert2";

type ProductDetailsProps = {
  product: Product;
  index: number;
};

export async function action({params}:ActionFunctionArgs){
  if(params.id !== undefined){
    await deleteProduct(+params.id);
    return redirect('/')
  }
}


export default function ProductDetails({
  product,
  index,
}: ProductDetailsProps) {
  const navigate = useNavigate();

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitar el envío automático del formulario
    const result = await Swal.fire({
      title: "¿Estás seguro que deseas eliminar este producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      e.currentTarget.submit(); // Enviar el formulario si el usuario confirma
    }
  };


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
      <td className="px-4 py-2 text-sm text-left font-medium text-gray-700 space-x-1 flex">
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
       <Form method="POST" action={`/productos/${product.id}/eliminar`} onSubmit={handleDelete}>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </Form> 
      </td>
    </tr>
  );
}
