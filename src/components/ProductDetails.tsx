import { Product } from "../types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionFunctionArgs, Form, redirect, useNavigate } from "react-router-dom";
import { deleteProduct } from "../services/ProductServices";
import Swal from "sweetalert2";

type ProductDetailsProps = {
  product: Product;
  index: number;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");

  try {
    if (id) {
      await deleteProduct(+id);
      return redirect('/');
    }
  } catch (error) {
    throw new Error("No se pudo eliminar el producto");
  }
}

export default function ProductDetails({
  product,
  index,
}: ProductDetailsProps) {
  const navigate = useNavigate();

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      e.currentTarget.submit();
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="p-3 text-sm text-gray-700 border-b border-gray-200">
        {index + 1}
      </td>
      <td className="p-3 text-sm text-gray-700 border-b border-gray-200">
        {product.nombre}
      </td>
      <td className="p-3 text-sm text-gray-700 border-b border-gray-200">
        {product.precio_compra.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}
      </td>
      <td className="p-3 text-sm text-gray-700 border-b border-gray-200">
        {product.precio_venta.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        })}
      </td>
      <td className="p-3 text-sm text-center border-b border-gray-200">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          product.disponible 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {product.disponible ? "Sí" : "No"}
        </span>
      </td>
      <td className="p-3 text-sm text-gray-700 border-b border-gray-200">
        {product.ultima_vez_ingresado}
      </td>
      <td className="p-3 text-sm text-gray-700 border-b border-gray-200">
        {product.updated_at}
      </td>
      <td className="p-3 text-sm border-b border-gray-200">
        <div className="flex space-x-2">
          <button
            className="bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 rounded-md transition-all duration-300 shadow-sm"
            onClick={() =>
              navigate(`/productos-admin/${product.id}/editar`, {
                state: {
                  product,
                },
              })
            }
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <Form method="POST" onSubmit={handleDelete}>
            <input type="hidden" name="id" value={product.id} />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md transition-all duration-300 shadow-sm"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
}
