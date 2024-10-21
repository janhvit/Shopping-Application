import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: ''
    });
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Logging in with URL: http://localhost:8000/auth/login/ and data:", loginDetails);
        
        try {
            const response = await axios.post('http://localhost:8000/auth/login/', loginDetails);
        
            if (response && response.data) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                
               
                navigate('/cart'); 
            } else {
                console.log('No data in response');
                setErrorMessage('No data received');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Login failed. Please check your credentials.');
        }
    };
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={loginDetails.username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginDetails.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Login</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {user && user.data ? (
                <div>
                    <h3>Welcome, {user.data.name}!</h3>
                    <p>Email: {user.data.email}</p>
                </div>
            ) : (
                <p>Please log in to access your account.</p>
            )}
        </div>
    );
};

export default Login;
