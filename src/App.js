import Login from "./Components/login";
import Signin from "./Components/Sigin";
import Cardlist from "./Components/Cardlist";
import Cart from "./Components/Cart";
import AdminPage from "./Components/Adminfile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/NavBar";
import { useState } from 'react';

const App = () => {
  const [search, setSearch] = useState('');
  return (
    <Router>

      <Route path="/login" element={<Login />} />
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/Signin" element={<Signin />} />
        <Route path="/cardlist" element={<Cardlist search={search} />} />
        <Route path="/success" element={<h1>✅ Payment Successful</h1>} />
        <Route path="/cancel" element={<h1>❌ Payment Cancelled</h1>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;