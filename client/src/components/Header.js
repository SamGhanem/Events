import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../components/header.css';
import axios from 'axios';
const Header = ({ isLoggedin, setIsLoggedin }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios
        .get('http://localhost:8000/api/current-user', { withCredentials: true })
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => console.log(err));
    }, [isLoggedin]);

    const handleLogout = () => {
        axios
        .post('http://localhost:8000/logout',{}, { withCredentials: true })
        .then((res) => {
        setUser(null);
        })
        .catch((err) => console.log(err));
    };
    return (
        <header className="header">
        <h1>Movies App</h1>
        <NavLink className="nav-link" to="/">
            Home
        </NavLink>
        <NavLink className="nav-link" to="/new">
            Add a New Movie
        </NavLink>
        <div className="auth">
            {user ? (
            <div>
                <p>Hello: {user.username}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            ) : (
            <div>
                <NavLink className="nav-link" to="/login">
                Login
                </NavLink>
                <span> | </span>
                <NavLink className="nav-link" to="/register">
                Register
                </NavLink>
            </div>
            )}
        </div>
        </header>
    );
};

export default Header;