import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = ({ setIsLoggedin }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleChange = (e) => {
        setUser({
        ...user,
        [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:8000/register', user, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            setIsLoggedin(true);
            navigate('/');
        })
        .catch((err) => console.log(err));
    };
    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={user.username} onChange={handleChange} required />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} required />
        <label htmlFor="password">Password:</label>
        <input type="text" name="password" value={user.password} onChange={handleChange} required />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
            type="text"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            required
        />
        <button>Register</button>
        </form>
    );
};

export default Register;