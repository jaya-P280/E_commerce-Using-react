import { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import './style.css';

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(()=>{
    const user=localStorage.getItem('user-id');
    return user ? JSON.parse(user):{
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        gender: '',
        password: ''
  }});

  useEffect(()=>{
    localStorage.setItem('user-id',JSON.stringify(formData));
  },[formData]);

  const [confirmpassword, setconfirmpassword] = useState('');
  const [errors, setErrors] = useState({});

  const handlesignin = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!confirmpassword.trim()) newErrors.confirmpassword = 'Confirm password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.password !== confirmpassword) {
      setErrors({ confirmpassword: 'Passwords do not match' });
      return;
    }
    try {
      fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message)
          if (data.message === "User registered successfully") {
            setFormData({
              firstname: '',
              middlename: '',
              lastname: '',
              email: '',
              gender: '',
              password: ''
            });
            setconfirmpassword('');
            setErrors({});
          }
        });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="loginform">
      <form onSubmit={handlesignin}>
        <h1>Sign in</h1>
        <label>
          First Name:
          <input
            type="text"
            value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          />
          {errors.firstname && <p className="error">{errors.firstname}</p>}
        </label><br />
        <label>
          Middle Name:
          <input
            type="text"
            value={formData.middlename}
            onChange={(e) => setFormData({ ...formData, middlename: e.target.value })}
          />
        </label><br />
        <label>
          Last Name:
          <input
            type="text"
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          />{errors.lastname && <p className="error">{errors.lastname}</p>}
        </label><br />
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />{errors.email && <p className="error">{errors.email}</p>}
        </label><br />
        <label>
          Gender:
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Trans">Trans</option>
          </select>{errors.gender && <p className="error">{errors.gender}</p>}
        </label><br />
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />{errors.password && <p className="error">{errors.password}</p>}
        </label><br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
          {errors.confirmpassword && <p className="error">{errors.confirmpassword}</p>}
        </label><br />
        <button type="submit">submit</button>
        <p>
          I have a Account ?<Link to='/Login'>Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Signin;
