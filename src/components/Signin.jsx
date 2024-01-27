// Login.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { Authcontext } from '../context/Authcontext';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let { loginFn } = useContext(Authcontext)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === '') {
            setError('Please enter the email address');
            return;
        }
        if (password === '') {
            setError('Please enter the password');
        }
        // Add authentication logic using Firebase or your preferred authentication method
        try {
            setError('');
            setLoading(true);
            await loginFn(email, password);
            navigate('/');
        } catch {
            setError('Username is not found or wrong Passowrd is enterted');
        }
        // console.log('Login button clicked');
        setLoading(false);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} required />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={loading}>Login</button>
            </form>

            <p className="signup-link">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
