import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';

export default function CartSummary() {
  const { items, getTotal } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 rounded-full p-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-indigo-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en el carrito
              </p>
              <p className="text-lg font-bold text-indigo-600">
                {getTotal().toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </p>
            </div>
          </div>
          
          <Link
            to="/pedidos"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Ver detalle completo
          </Link>
        </div>
      </div>
    </div>
  );
}