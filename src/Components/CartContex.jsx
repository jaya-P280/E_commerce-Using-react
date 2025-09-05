import { createContext, useContext, useState ,useEffect} from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(()=>{
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    })
  };

  const incrementItem = (id) => {
    setCart((prev) =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decrementItem = (id) => {
    setCart((prev) =>
      prev
        .map(p =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter(p => p.quantity > 0)
    );
  };


  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };
  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((acc, item) => acc + item.price*item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart,incrementItem,decrementItem, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
