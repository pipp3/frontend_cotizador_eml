import { Product } from "../types";
import DatePicker,{registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState,useEffect } from "react";
import { es as esLocale } from 'date-fns/locale';
import { parse } from "date-fns";

registerLocale("es", esLocale);

type ProductFormProps = {
    product?:Product
}
export default function ProductForm({product}:ProductFormProps) {
    // Convertir la fecha inicial del producto (si existe) a un objeto Date
  const initialDate = product?.ultima_vez_ingresado
  ? parse(product.ultima_vez_ingresado, "dd/MM/yyyy", new Date())
  : null;


  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const handleDateChange = (date:Date | null) => {
    setSelectedDate(date);
  }
  useEffect(() => {
    // Actualizar la fecha seleccionada si cambia el producto
    if (product?.ultima_vez_ingresado) {
      setSelectedDate(
        parse(product.ultima_vez_ingresado, "dd/MM/yyyy", new Date())
      );
    }
  }, [product]);
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="nombre" className="block font-medium text-gray-700">Nombre del Producto</label>
        <input type="text" name="nombre" id="nombre" className="mt-1 block w-full py-1 px-1 rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" defaultValue={product?.nombre} />

      </div>
      <div className="mb-4">
        <label htmlFor="precio_compra" className="block font-medium text-gray-700">Precio de Compra</label>
        <input type="number" name="precio_compra" id="precio_compra" className="mt-1 block w-full py-1 px-1 rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " defaultValue={product?.precio_compra} />
      </div>
      <div className="mb-4">
        <label htmlFor="precio_venta" className="block text-sm font-medium text-gray-700">Precio de Venta</label>
        <input type="number" name="precio_venta" id="precio_venta" className="mt-1 block w-full py-1 px-1 rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" defaultValue={product?.precio_venta} />
      </div>
      <div className="mb-4">
        <label htmlFor="ultima_vez_ingresado" className="block text-sm font-medium text-gray-700">Última Vez Ingresado</label>
        <DatePicker
          id="ultima_vez_ingresado"
          name="ultima_vez_ingresado"
          placeholderText="Seleccione una fecha"
          className="mt-1 block w-full py-1 px-1 rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          selected={selectedDate}
          onChange={handleDateChange}
          locale="es"
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  )
}
