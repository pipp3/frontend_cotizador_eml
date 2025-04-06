import { useCartStore } from '../../store/useCartStore';
import { Link } from 'react-router-dom';

export default function CartView() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-6">Agrega algunos productos para verlos aquí</p>
        <Link
          to="/productos"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Ir a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Carrito de Compras</h2>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Vaciar carrito
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
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
                <h3 className="font-medium text-gray-900">{item.product.nombre}</h3>
                <p className="text-sm text-gray-500">
                  {item.product.precio_venta.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-600 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-900">Total</span>
          <span className="text-2xl font-bold text-indigo-600">
            {getTotal().toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </span>
        </div>
      </div>
    </div>
  );
} 