import axios from "axios";
import { OrderFormData } from "../types/order";

export const createOrder = async (orderData: OrderFormData) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/orders/create-order`;
    const { data } = await axios.post(url, orderData);
    return data.data;
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/orders/get-user-orders`;
    const { data } = await axios.get(url);
    return data.data;
  } catch (error) {
    console.error("Error al obtener los pedidos del usuario:", error);
    throw error;
  }
};

export const getOrderDetail = async (id: number) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/orders/get-order-detail?id=${id}`;
    const { data } = await axios.get(url);
    return data.data;
  } catch (error) {
    console.error("Error al obtener el detalle del pedido:", error);
    throw error;
  }
};

export const getOrderFullDetail = async (id: number) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/orders/get-order?id=${id}`;
    const { data } = await axios.get(url);
    return data.data;
  } catch (error) {
    console.error("Error al obtener el detalle completo del pedido:", error);
    throw error;
  }
};

export const updateOrderClient = async (id: number, items: { id?: number; producto_id: number; cantidad: number; eliminar_item?: boolean }[]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/orders/update-order-client?id=${id}`;
    const { data } = await axios.patch(url, { items });
    return data.data;
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    throw error;
  }
};

export const getOrders = async (page: number = 1) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/orders/get-orders?page=${page}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    throw error;
  }
};

