import { Link, Form, redirect, ActionFunctionArgs, useActionData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import DatePicker,{registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { es as esLocale } from 'date-fns/locale';
import { createProduct } from "../services/ProductServices";

registerLocale("es", esLocale);

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  let error = '';
  if(Object.values(data).includes('')) {
    error = 'Todos los campos son requeridos';
  }
  
  if(error.length) {
    return error;
  }

  await createProduct(data);
  
  return redirect('/');
}

export default function NewProduct() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const error = useActionData() as string;

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-sky-700">Nuevo Producto</h2>
        <Link 
          to="/" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors font-semibold"
        >
          Volver a Listado de Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form method="POST" className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="nombre" className="block font-medium">Nombre del Producto</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre" 
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="precio_compra" className="block font-medium">Precio Compra</label>
          <input 
            type="number" 
            id="precio_compra" 
            name="precio_compra" 
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="precio_venta" className="block font-medium">Precio de Venta</label>
          <input 
            type="number" 
            id="precio_venta" 
            name="precio_venta" 
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="ultima_vez_ingresado" className="block font-medium">
            Última Vez Ingresado
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholderText="Seleccione una fecha"
            id="ultima_vez_ingresado"
            name="ultima_vez_ingresado"
            locale="es"
            isClearable
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-colors mt-6"
        >
          Crear Producto
        </button>
      </Form>
    </div>
  );
}
