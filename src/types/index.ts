import { object, string, number, boolean, array } from "valibot";

export const DraftProductSchema = object({
  nombre: string(),
  precio_venta: number(),
  precio_compra: number(),
  ultima_vez_ingresado: string()
});

export const ProductSchema = object({
  id: number(),
  nombre: string(),
  precio_venta: number(),
  precio_compra: number(),
  disponible: boolean(),
  ultima_vez_ingresado: string(),
  updated_at: string(),
  created_at: string()  // Agregamos el campo `created_at` que está en la respuesta de la API
});

export const ProductsSchema = array(ProductSchema);

// Schema para productos destinados a clientes
export const ProductForClientesSchema = object({
  id: number(),
  nombre: string(),
  precio_venta: number(),
  disponible: boolean()
});

export const ProductsForClientesSchema = array(ProductForClientesSchema);

export type Product = {
  id: number;
  nombre: string;
  precio_venta: number;
  precio_compra: number;
  disponible: boolean;
  ultima_vez_ingresado: string;
  updated_at: string;
  created_at: string; // Asegúrate de incluir este campo también en el tipo
};


export type ProductForClientes = {
  id: number;
  nombre: string;
  precio_venta: number;
  disponible: boolean;
};