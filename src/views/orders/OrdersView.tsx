import { useCartStore } from '../../store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/OrderServices';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { OrderFormData } from '../../types/order';

export default function OrdersView() {
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<OrderFormData>>({
    ciudad_destino: '',
    direccion_destino: '',
    rut_destinatario: '',
    company: '',
    tipo_envio: 'estandar',
    metodo_pago: 'transferencia',
    tipo_documento: 'factura'
  });

  // Función para validar RUT chileno
  const validateRut = (rut: string): boolean => {
    // Eliminar puntos y guión
    const cleanRut = rut.replace(/[.-]/g, '');
    
    // Verificar que solo contenga números y tenga entre 7 y 9 dígitos
    return /^\d{7,9}$/.test(cleanRut);
  };

  // Función para formatear RUT
  const formatRut = (rut: string): string => {
    // Eliminar puntos y guión
    const cleanRut = rut.replace(/[.-]/g, '');
    
    // Si tiene 7-9 dígitos, agregar guión
    if (cleanRut.length >= 7 && cleanRut.length <= 9) {
      return cleanRut.slice(0, -1) + '-' + cleanRut.slice(-1);
    }
    
    return cleanRut;
  };

  // Función para validar campos
  const validateField = (name: string, value: string | undefined): string => {
    if (!value) {
      switch (name) {
        case 'rut_destinatario':
          return 'El RUT es requerido';
        case 'ciudad_destino':
          return 'La ciudad es requerida';
        case 'direccion_destino':
          return 'La dirección es requerida';
        case 'company':
          return 'Debe seleccionar una compañía de envío';
        case 'tipo_envio':
          return 'Debe seleccionar un tipo de envío';
        case 'metodo_pago':
          return 'Debe seleccionar un método de pago';
        case 'tipo_documento':
          return 'Debe seleccionar un tipo de documento';
        default:
          return '';
      }
    }

    switch (name) {
      case 'rut_destinatario':
        const cleanRut = value.replace(/[.-]/g, '');
        if (!/^\d{7,9}$/.test(cleanRut)) return 'El RUT debe tener entre 7 y 9 dígitos';
        return '';

      case 'ciudad_destino':
        if (value.length < 3) return 'La ciudad debe tener al menos 3 caracteres';
        if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(value)) return 'La ciudad solo puede contener letras y espacios';
        return '';

      case 'direccion_destino':
        if (value.length < 5) return 'La dirección debe tener al menos 5 caracteres';
        return '';

      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'rut_destinatario') {
      // Formatear RUT automáticamente
      const formattedValue = formatRut(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Validar campo al cambiar
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmitOrder = async () => {
    try {
      setIsSubmitting(true);
      
      // Validar todos los campos
      const newErrors: Record<string, string> = {};
      let hasErrors = false;

      // Campos base requeridos
      let requiredFields: (keyof OrderFormData)[] = ['rut_destinatario', 'tipo_envio', 'metodo_pago', 'tipo_documento'];
      
      // Si es envío estándar, agregar campos adicionales
      if (formData.tipo_envio === 'estandar') {
        requiredFields = [...requiredFields, 'ciudad_destino', 'direccion_destino', 'company'];
      }

      // Validar cada campo
      requiredFields.forEach(field => {
        const value = formData[field];
        if (typeof value === 'string') {
          const error = validateField(field, value);
          if (error) {
            newErrors[field] = error;
            hasErrors = true;
          }
        }
      });

      if (hasErrors) {
        setErrors(newErrors);
        toast.error('Por favor corrija los errores en el formulario');
        return;
      }

      const orderData: OrderFormData = {
        ...formData as OrderFormData,
        items: items.map(item => ({
          producto_id: item.product.id,
          cantidad: item.quantity
        }))
      };

      // Si es retiro en tienda, eliminar los campos no requeridos
      if (orderData.tipo_envio === 'retiro') {
        delete orderData.ciudad_destino;
        delete orderData.direccion_destino;
        delete orderData.company;
      }

      console.log('Datos del pedido:', orderData);

      await createOrder(orderData);
      clearCart();
      toast.success('¡Pedido creado exitosamente!');
      navigate('/pedidos');
    } catch (error) {
      toast.error('Error al crear el pedido');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-6">Agrega algunos productos para crear un pedido</p>
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
        <h2 className="text-2xl font-bold text-gray-800">Confirmar Pedido</h2>
        <Link
          to="/productos"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Seguir comprando
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Productos</h3>
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
                  <p className="text-sm text-gray-500">
                    Cantidad: {item.quantity}
                  </p>
                  <p className="text-sm font-medium text-indigo-600">
                    Subtotal: {(item.product.precio_venta * item.quantity).toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Envío</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Envío
              </label>
              <select
                name="tipo_envio"
                value={formData.tipo_envio}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.tipo_envio ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="estandar">Envío Estándar</option>
                <option value="retiro">Retiro en Tienda</option>
              </select>
              {errors.tipo_envio && (
                <p className="mt-1 text-sm text-red-600">{errors.tipo_envio}</p>
              )}
            </div>

            {formData.tipo_envio === 'estandar' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad de Destino
                  </label>
                  <input
                    type="text"
                    name="ciudad_destino"
                    value={formData.ciudad_destino}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.ciudad_destino ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.ciudad_destino && (
                    <p className="mt-1 text-sm text-red-600">{errors.ciudad_destino}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección de Destino
                  </label>
                  <input
                    type="text"
                    name="direccion_destino"
                    value={formData.direccion_destino}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.direccion_destino ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.direccion_destino && (
                    <p className="mt-1 text-sm text-red-600">{errors.direccion_destino}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Compañía de Envío
                  </label>
                  <select
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.company ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  >
                    <option value="">Seleccione una compañía</option>
                    <option value="starken">Starken</option>
                    <option value="varmontt">Varmontt</option>
                    <option value="chevalier">Chevalier</option>
                  </select>
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                RUT del Destinatario o de quien Retira
              </label>
              <input
                type="text"
                name="rut_destinatario"
                value={formData.rut_destinatario}
                onChange={handleInputChange}
                placeholder="Ej: 12345678-9"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.rut_destinatario ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.rut_destinatario && (
                <p className="mt-1 text-sm text-red-600">{errors.rut_destinatario}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Método de Pago
              </label>
              <select
                name="metodo_pago"
                value={formData.metodo_pago}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.metodo_pago ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="tarjeta">Tarjeta de Credito/Debito</option>
                <option value="efectivo">Efectivo</option>
              </select>
              {errors.metodo_pago && (
                <p className="mt-1 text-sm text-red-600">{errors.metodo_pago}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Documento
              </label>
              <select
                name="tipo_documento"
                value={formData.tipo_documento}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.tipo_documento ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="factura">Factura</option>
                <option value="boleta">Boleta</option>
              </select>
              {errors.tipo_documento && (
                <p className="mt-1 text-sm text-red-600">{errors.tipo_documento}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-gray-900">Total</span>
          <span className="text-2xl font-bold text-indigo-600">
            {getTotal().toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </span>
        </div>
        <button
          onClick={handleSubmitOrder}
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
        </button>
      </div>
    </div>
  );
} 