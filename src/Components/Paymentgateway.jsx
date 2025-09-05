
const Payment = ({ amount}) => {
    const loadRazorpay = async () => {
        try {
            const user=JSON.parse(localStorage.getItem('user') || '{}');
            const response = await fetch("http://localhost:3001/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount ,user})
            });

            const {order} = await response.json();
;

            const options = {
                key: "rzp_test_JNuP7tKBZVF3QX",
                amount: Number(order.amount),
                currency: order.currency,
                name: "My E-Commerce",
                description: "Product Purchase",
                image: "https://yourlogo.com/logo.png", // optional
                order_id: order.id,
                handler: function (response) {
                    alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: "Palem Jaya Prakash Goud",
                    email: user.email ,
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Error creating Razorpay order:", error.message);
            alert("Something went wrong while initiating payment");
        }
    };

    return (
        <button onClick={loadRazorpay} style={{
            padding: '8px 12px',
            background: '#28a745',
            color: '#fff',
            border: 'none',
            width: 'auto',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '8px'
        }}>
            Pay ₹{amount}
        </button>
    );
};

export default Payment;
