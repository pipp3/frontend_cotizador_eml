import { useEffect, useState } from 'react';
import { Order } from '../../types/order';
import { getOrders } from '../../services/OrderServices';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

export default function AdminOrdersView() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const fetchOrders = async (page: number) => {
    try {
      setLoading(true);
      const response = await getOrders(page);
      setOrders(response.data.pedidos);
      setTotalPages(response.data.pagination.total_pages);
      setHasNext(response.data.pagination.has_next);
      setHasPrev(response.data.pagination.has_prev);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      toast.error('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'enviado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-800">Pedidos</h1>
      </div>

      <div className="mt-8">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-800 to-purple-800">
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  ID
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Fecha
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Cliente
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Total
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Estado
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Tipo de Envío
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
                    #{order.id}
                  </td>
                  <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
                    {format(new Date(order.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}
                  </td>
                  <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
                    {order.rut_destinatario}
                  </td>
                  <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
                    {order.total.toLocaleString('es-CL', {
                      style: 'currency',
                      currency: 'CLP',
                    })}
                  </td>
                  <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.estado)}`}>
                      {order.estado}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
                    {order.tipo_envio === 'estandar' ? 'Envío Estándar' : 'Retiro en Tienda'}
                  </td>
                  <td className="p-3 text-sm text-left font-medium text-gray-700">
                    <button
                      onClick={() => navigate(`/pedidos-admin/${order.id}`)}
                      className="bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 rounded-md transition-all duration-300 shadow-sm mr-2"
                    >
                      Ver Detalle
                    </button>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrev}
          className={`px-4 py-2 rounded-md ${
            hasPrev
              ? 'bg-gradient-to-r from-blue-800 to-purple-800 text-white hover:from-blue-700 hover:to-purple-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } transition-all duration-300 shadow-md`}
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNext}
          className={`px-4 py-2 rounded-md ${
            hasNext
              ? 'bg-gradient-to-r from-blue-800 to-purple-800 text-white hover:from-blue-700 hover:to-purple-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } transition-all duration-300 shadow-md`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
} 