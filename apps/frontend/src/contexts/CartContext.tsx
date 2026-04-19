'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  variation: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variation: string) => void;
  updateQuantity: (id: string, variation: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('biolo_cart');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar carrinho', e);
      }
    }
    setLoaded(true);
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('biolo_cart', JSON.stringify(items));
    }
  }, [items, loaded]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.id === newItem.id && item.variation === newItem.variation
      );
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id && item.variation === newItem.variation
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: string, variation: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.id === id && item.variation === variation))
    );
  };

  const updateQuantity = (id: string, variation: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, variation);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.variation === variation
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}