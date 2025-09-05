import { useEffect, useState } from 'react';
import { useCart } from './CartContex';
import Payment from './Paymentgateway';

const Cardlist = ({ search }) => {
    const [products, setProducts] = useState([]);

    const {  addToCart } = useCart();

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Product List</h1>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px'
            }}>
                {products.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).map((item) => {
                return (
                    <div key={item._id} style={{
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '15px',
                        width: '250px',
                        textAlign: 'center',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                    }}>
                        <img src={item.thumbnail} alt={item.title} width={200} height={150} />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p><b>₹{item.price}</b></p>
                        <button
                            onClick={() => {addToCart(item);alert(`${item.title} is added to cart`)}}
                            style={{
                                padding: '8px 12px',
                                background: '#28a745',
                                color: '#fff',
                                border: 'none',
                                width: 'auto',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginRight: '8px'
                            }}
                        >
                            Add to Cart
                        </button>
                        <Payment amount={item.price}/>
                    </div>
)})}
            </div>
        </div>
    );
};

export default Cardlist;
