import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './store/store';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', {
                username,
                password,
            });
            if (response.data.status === 'fail') {
                setErrorMessage(response.data.message);
            } else {
                const token = response.data.token;
                console.log(token)
                Cookies.set('token', token, { secure: true, sameSite: 'strict' });
                dispatch(loginSuccess(token));
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error.response.data);
            dispatch(loginFailure('An error occurred'));
        }
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Login</button>

                <div className="forgot-password">
                    <a href="/forgot">Forgot password?</a>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
