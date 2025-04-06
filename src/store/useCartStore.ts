import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/cart';
import { ProductForClientes } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: ProductForClientes, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: ProductForClientes, quantity: number) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          
          return {
            items: [...state.items, { product, quantity }]
          };
        });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
      },

      updateQuantity: (productId: number, quantity: number) => {
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          return total + (item.product.precio_venta * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'cart-storage', // nombre único para el almacenamiento
    }
  )
); 