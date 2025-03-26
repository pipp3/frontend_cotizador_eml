import { UserDetailsProps } from "../types/users";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteUser } from "../services/UserServices";
import { toast } from "react-toastify";

export default function UserDetails({
  user,
  index,
}: UserDetailsProps) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro que deseas eliminar este usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(user.id);
        toast.success(`El usuario ${user.nombre} ${user.apellido} ha sido eliminado correctamente`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Esperar 1 segundo antes de recargar para que se vea la notificación
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast.error("Error al eliminar el usuario. Por favor, intente nuevamente", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <tr className="hover:bg-blue-50 transition-colors duration-200">
      <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
        {index + 1}
      </td>
      <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
        {user.nombre} {user.apellido}
      </td>
      <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
        {user.email}
      </td>
      <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
        {user.celular}
      </td>
      <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
        {user.ciudad}
      </td>
      <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
        {user.rol}
      </td>
      <td className="p-3 text-sm text-left font-medium text-gray-700 space-x-2 flex">
        <button
          className="bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 rounded-md transition-all duration-300 shadow-sm"
          onClick={() =>
            navigate(`/usuarios/${user.id}/editar`, {
              state: {
                user,
              },
            })
          }
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md transition-all duration-300 shadow-sm"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
} 