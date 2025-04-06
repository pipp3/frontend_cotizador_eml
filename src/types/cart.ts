import { ProductForClientes } from "./index";

export type CartItem = {
  product: ProductForClientes;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  addItem: (product: ProductForClientes, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}; 