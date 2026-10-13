import { createContext, useContext } from 'react'
export type CartItem = { slug: string; name: string; type: string; price: string; image: string; quantity: number }
export type CartState = {
  cartItems: CartItem[]; cartOpen: boolean; setCartOpen: (open: boolean) => void
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (slug: string) => void; updateQuantity: (slug: string, quantity: number) => void
  clearCart: () => void; refreshPrices: (products: { slug: string; price: string }[]) => void
  cartCount: number; cartTotal: number
}
export const CartContext = createContext<CartState | undefined>(undefined)
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
