// src/store/cartStore.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  cartCount: 0,
  addToCart: (product) => set((state) => ({
    cartItems: [...state.cartItems, product],
    cartCount: state.cartItems.length + 1
  })),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.id !== productId),
    cartCount: state.cartItems.length - 1
  })),
  clearCart: () => set({ cartItems: [], cartCount: 0 })
}));