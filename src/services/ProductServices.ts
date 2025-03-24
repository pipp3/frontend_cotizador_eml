import { safeParse } from "valibot";
import {
  ProductsSchema,
  DraftProductSchema,
  ProductSchema,
  Product,
  ProductsForClientesSchema
} from "../types";
import axios from "axios";

type ProductData = {
  [key: string]: FormDataEntryValue;
};

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/productos`;
    const { data } = await axios.get(url);
    const products = data.data;

    // Validar los productos
    const result = safeParse(ProductsSchema, products);

    if (!result.success) {
      console.error("Errores de validación: ", result.issues);
      throw new Error(
        "Error al validar los productos: " + JSON.stringify(result.issues)
      );
    }
    // Si la validación fue exitosa, retornar los productos validados
    return result.output;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsForClientes = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/productos/get-products-clients`;
    const { data } = await axios.get(url, {
      withCredentials: true
    });
    const products = data.data;
    
    // Usar el schema correcto para productos para clientes
    const result = safeParse(ProductsForClientesSchema, products);
    
    if (!result.success) {
      console.error("Errores de validación: ", result.issues);
      throw new Error("Error al validar los productos: " + JSON.stringify(result.issues));
    }
    return result.output;
  } catch (error) {
    console.error("Error en getProductsForClientes:", error);
    // Lanzar el error para que sea manejado por el loader
    throw error;
  }
};

export const createProduct = async (data: ProductData) => {
  try {
    const result = safeParse(DraftProductSchema, {
      nombre: data.nombre,
      precio_compra: +data.precio_compra,
      precio_venta: +data.precio_venta,
      ultima_vez_ingresado: data.ultima_vez_ingresado,
    });
    //console.log(result.output);
    //console.log(result.success);
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/productos`;
      await axios.post(url, {
        headers: {
          "Content-Type": "application/json",
        },
        nombre: result.output.nombre,
        precio_compra: result.output.precio_compra,
        precio_venta: result.output.precio_venta,
        ultima_vez_ingresado: result.output.ultima_vez_ingresado,
      });
    } else {
      throw new Error("Error al validar los datos");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: Product["id"]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/productos/${id}`;
    const { data } = await axios.get(url);
    const product = data.data;
    //console.log(product)
    const result = safeParse(ProductSchema, product);
    //console.log(result)
    if (!result.success) {
      throw new Error("Error al validar los datos");
    }
    return result.output;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id: Product["id"], data: ProductData) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/productos/${id}`;
    await axios.put(url, {
      nombre: data.nombre,
      precio_compra: +data.precio_compra,
      precio_venta: +data.precio_venta,
      ultima_vez_ingresado: data.ultima_vez_ingresado,
      disponible: data.disponible,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id:Product['id'])=>{
  try {
    const url= `${import.meta.env.VITE_API_URL}/productos/${id}`
    await axios.delete(url)
  } catch (error) {
    console.log(error)
  }
}
