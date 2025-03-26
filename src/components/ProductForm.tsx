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
    const initialDate = product?.ultima_vez_ingresado
      ? parse(product.ultima_vez_ingresado, "dd/MM/yyyy", new Date())
      : null;

    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
    
    const handleDateChange = (date:Date | null) => {
      setSelectedDate(date);
    }

    useEffect(() => {
      if (product?.ultima_vez_ingresado) {
        setSelectedDate(
          parse(product.ultima_vez_ingresado, "dd/MM/yyyy", new Date())
        );
      }
    }, [product]);

    return (
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="nombre" 
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Producto
          </label>
          <input 
            type="text" 
            name="nombre" 
            id="nombre" 
            defaultValue={product?.nombre}
            className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="precio_compra" 
              className="block text-sm font-medium text-gray-700"
            >
              Precio de Compra
            </label>
            <input 
              type="number" 
              name="precio_compra" 
              id="precio_compra" 
              defaultValue={product?.precio_compra}
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="precio_venta" 
              className="block text-sm font-medium text-gray-700"
            >
              Precio de Venta
            </label>
            <input 
              type="number" 
              name="precio_venta" 
              id="precio_venta" 
              defaultValue={product?.precio_venta}
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label 
            htmlFor="ultima_vez_ingresado" 
            className="block text-sm font-medium text-gray-700"
          >
            Última Vez Ingresado
          </label>
          <DatePicker
            id="ultima_vez_ingresado"
            name="ultima_vez_ingresado"
            placeholderText="Seleccione una fecha"
            className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            selected={selectedDate}
            onChange={handleDateChange}
            locale="es"
            dateFormat="dd/MM/yyyy"
            isClearable
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
      </div>
    );
}
