// SignUp.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signupFn } = useContext(Authcontext);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    let handleSignUp = async (e) => {
        e.preventDefault();

        // Validate password match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            setError('');
            setLoading(true);
            await signupFn(email, password);
            navigate('/')

        } catch {
            setError('Failed to sign up');
        }
        setLoading(false);

        // Add signup logic using Firebase or your preferred authentication method
        // console.log('Sign up button clicked');
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <label>Name:</label>
                <input type="text" value={name} onChange={handleNameChange} required />

                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} required />

                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={loading}>Sign Up</button>

                <p className="signup-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
