import { useState, useEffect } from 'react';
import validator from 'validator';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("addProduct");
  const [productData, setProductData] = useState({ title: "", price: "", thumbnail: "" });
  const [transactions, setTransactions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (activeTab === "transactions") {
      fetch("http://localhost:3001/admin/transactions")
        .then((res) => res.json())
        .then((data) => setTransactions(data))
        .catch((err) => console.error("Failed to fetch transactions:", err));
    }
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAddProduct = () => {
    const newErrors = {};

    if (!productData.title.trim()) newErrors.title = "Title is required.";
    if (!productData.price || isNaN(productData.price) || Number(productData.price) <= 0)
      newErrors.price = "Price must be a positive number.";
    if (!productData.thumbnail.trim() || !validator.isURL(productData.thumbnail))
      newErrors.thumbnail = "A valid image URL is required.";

    return newErrors;
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const validationErrors = validateAddProduct();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    fetch("http://localhost:3001/admin/addproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Product added successfully");
        setProductData({ title: "", price: "", thumbnail: "" });
        setErrors({});
      })
      .catch((err) => console.error("Failed to add product:", err));
  };

  const validateRemoveProduct = () => {
    const newErrors = {};
    if (!productData.title.trim()) newErrors.title = "Title is required to remove product.";
    return newErrors;
  };

  const handleRemoveProduct = (e) => {
    e.preventDefault();
    const validationErrors = validateRemoveProduct();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    fetch("http://localhost:3001/admin/removeproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: productData.title })
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Product removed successfully");
        setProductData({ title: "", price: "", thumbnail: "" });
        setErrors({});
      })
      .catch((err) => console.log("Failed to remove product:", err));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🛠️ Admin Dashboard</h2>

      <div style={{ marginBottom: "1rem", display: 'flex', gap: '10px' }}>
        <button onClick={() => setActiveTab("addProduct")}>➕ Add Product</button>
        <button onClick={() => setActiveTab("transactions")}>📜 View Transactions</button>
        <button onClick={() => setActiveTab("RemoveProduct")}>➖ Remove Product</button>
      </div>

      {activeTab === "addProduct" && (
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={productData.title}
            onChange={handleInputChange}
            style={{ marginBottom: "10px", display: "block" }}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleInputChange}
            style={{ marginBottom: "10px", display: "block" }}
          />
          {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}

          <input
            type="text"
            name="thumbnail"
            placeholder="Image URL"
            value={productData.thumbnail}
            onChange={handleInputChange}
            style={{ marginBottom: "10px", display: "block" }}
          />
          {errors.thumbnail && <p style={{ color: 'red' }}>{errors.thumbnail}</p>}

          <button type="submit">✅ Submit Product</button>
        </form>
      )}

      {activeTab === "RemoveProduct" && (
        <form onSubmit={handleRemoveProduct}>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={productData.title}
            onChange={handleInputChange}
            style={{ marginBottom: "10px", display: "block" }}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}

          <button type="submit">🗑️ Remove Product</button>
        </form>
      )}

      {activeTab === "transactions" && (
        <div>
          <h3>📄 Transaction History</h3>
          {transactions.length === 0 ? (
            <p>No transactions available.</p>
          ) : (
            <ul>
              {transactions.map((txn, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  <strong>User:</strong> {txn.email} <br />
                  <strong>Amount:</strong> ₹{txn.amount}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
