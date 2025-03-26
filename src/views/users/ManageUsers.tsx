import { Link, useLoaderData } from "react-router-dom";
import { getUsers } from "../../services/UserServices";
import { User } from "../../types/users";
import UserDetails from "../../components/UserDetails";

export async function loader() {
  const users = await getUsers();
  return users;
}

export default function ManageUsers() {
  const users = useLoaderData() as User[];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-800">Gestión de Usuarios</h1>
        <Link
          to="/administrar-usuarios/nuevo"
          className="bg-gradient-to-r from-blue-800 to-purple-800 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
        >
          Nuevo Usuario
        </Link>
      </div>
      <div className="mt-8">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-800 to-purple-800">
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  #
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Nombre Completo
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Email
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Celular
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Ciudad
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Rol
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {users.map((user, index) => (
                <UserDetails key={user.id} user={user} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
