import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './style.css';

const Login = () => {
  const [loginform, setLoginform] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginform)
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login Failed");
        return
      }
      localStorage.setItem('user', JSON.stringify(loginform));
      alert(` Login sucessfull`);
      navigate('/cardlist');

    } catch (err) {
      console.log(err);
      setError('Something went wrong. Please try again.');
    }
  };
  return (
    <div className='loginform'>
      <form onSubmit={handlelogin}>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label >
          Email :
          <input
            type="email"
            value={loginform.email}
            onChange={(e) => setLoginform({ ...loginform, email: e.target.value })} />
        </label>
        <label >
          Password :
          <input
            type="password"
            value={loginform.password}
            onChange={(e) => setLoginform({ ...loginform, password: e.target.value })} />
        </label>
        <button type='submit'>Submit</button>
        <p>
          Don`t have Account ?<Link to='/Signin'>Sign in</Link>
        </p>
      </form>

    </div>
  )
}

export default Login;