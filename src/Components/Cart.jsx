import { useCart } from './CartContex';
import Payment from './Paymentgateway';

const Cart = () => {
  const { cart, incrementItem, decrementItem, removeFromCart, clearCart, totalAmount } = useCart();
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} style={{ display: 'flex', marginBottom: '10px' }}>
              <img src={item.thumbnail} alt={item.title} width={80} style={{ marginRight: '10px' }} />
              <div style={{ flexGrow: 1 }}>
                <strong>{item.title}</strong><br />
                <p>Price:₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button style={{ width: 'auto',margin:'5px' }} onClick={() => decrementItem(item.id)}>-</button>
                <button style={{ width: 'auto' ,margin:'5px' }} onClick={() => incrementItem(item.id)}>+</button>
                <button style={{ width: 'auto' ,margin:'5px'}} onClick={() => removeFromCart(index)}>Remove</button>
              </div>

            </li>
          ))}
        </ul>
      )}
      <p><strong>Total: ₹{totalAmount}</strong></p>
      <button style={{ width: 'auto', display: 'flex', justifyItems: 'center', alignItems: 'center' ,marginBottom:'5px'}} onClick={() => clearCart()}>Clear Cart</button> <Payment amount={totalAmount} />
    </div>
  );
};

export default Cart;
