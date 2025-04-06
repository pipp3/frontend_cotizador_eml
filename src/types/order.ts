import { ProductForClientes } from "./index";

export type OrderItem = {
  id?: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  precio_total: number;
  producto?: ProductForClientes;
};

export type Order = {
  id: number;
  usuario_id: number;
  total: number;
  estado: string;
  fecha_envio?: string;
  ciudad_destino: string;
  direccion_destino: string;
  rut_destinatario: string;
  company?: string;
  tipo_envio: string;
  metodo_pago: string;
  tipo_documento: string;
  created_at: string;
  updated_at: string;
  detalles?: OrderItem[];
};

export type OrderFormData = {
  ciudad_destino?: string;
  direccion_destino?: string;
  rut_destinatario: string;
  company?: string;
  tipo_envio: string;
  metodo_pago: string;
  tipo_documento: string;
  items: {
    producto_id: number;
    cantidad: number;
  }[];
}; 