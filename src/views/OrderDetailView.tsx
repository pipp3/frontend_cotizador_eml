import { useParams } from 'react-router-dom';
import { OrderDetail } from '../components/OrderDetail';

export const OrderDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const orderId = parseInt(id || '0', 10);

  if (!orderId) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">ID de pedido inválido</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <OrderDetail orderId={orderId} />
      </div>
    </div>
  );
}; 