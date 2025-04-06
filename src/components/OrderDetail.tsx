import { useEffect, useState } from 'react';
import { getOrderDetail } from '../services/OrderServices';
import { useNavigate } from 'react-router-dom';

interface DetallePedido {
  id: number;
  producto_id: number;
  nombre_producto: string;
  cantidad: number;
  precio_unitario: number;
  precio_total: number;
}

interface OrderDetailProps {
  orderId: number;
}

export const OrderDetail = ({ orderId }: OrderDetailProps) => {
  const [detalles, setDetalles] = useState<DetallePedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const data = await getOrderDetail(orderId);
        setDetalles(data);
      } catch (err) {
        setError('Error al cargar los detalles del pedido');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalles();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-800">
          Detalles del Pedido #{orderId}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gradient-to-r from-blue-800 to-purple-800 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
        >
          Volver
        </button>
      </div>
      
      <div className="mt-8">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-800 to-purple-800">
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Producto
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Cantidad
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Precio Unitario
                </th>
                <th className="p-3 text-left text-white font-semibold text-sm border-r border-blue-700">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {detalles.map((detalle) => (
                <tr key={detalle.id} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
                    {detalle.nombre_producto}
                  </td>
                  <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
                    {detalle.cantidad}
                  </td>
                  <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
                    {detalle.precio_unitario.toLocaleString('es-CL', {
                      style: 'currency',
                      currency: 'CLP',
                    })}
                  </td>
                  <td className="p-3 text-sm text-left font-medium text-gray-700 border-r border-blue-100">
                    {detalle.precio_total.toLocaleString('es-CL', {
                      style: 'currency',
                      currency: 'CLP',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="text-lg font-semibold text-gray-900 bg-blue-50 p-3 rounded-md">
          Total: {detalles.reduce((acc, detalle) => acc + detalle.precio_total, 0).toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP',
          })}
        </div>
      </div>
    </div>
  );
}; 