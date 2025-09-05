import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './NavBar.css';
import { useCart } from './CartContex';

export default function Navbar({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('user');
  if (!isLoggedIn) return null;


  const navItems = [
    { name: 'Home', path: '/cardlist' },
    { name: 'Products', path: '/cardlist' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">🛍️ MyStore</h1>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-items">
            {navItems.map((item) => (
              <li key={item.name} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-actions">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button onClick={() => {
            navigate('/login');
            localStorage.removeItem('user');
          }} className="action-button">Logout</button>
          <button
            onClick={() => navigate('/cart')}
            className="action-button"
          >
            Show Cart ({cart.length})
          </button>
        </div>

      </div>
    </nav>
  );
}
