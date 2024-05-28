import React, { useContext, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import customAxios from '../server/utils/customAxios.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const LoginForm = () => {
    const { setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async () => {
        try {
            if (username.trim() === '' || password.trim() === '') {
                setError('Please fill in both username and password fields.');
                return;
            }
            setError('');

            await customAxios.post("/login", { username, password });
            setIsAuth(true);
            navigate("/announcements");
        } catch (error) {
            alert("There was some error !");
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '8rem', textAlign: 'center' }}>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <form style={{ marginTop: '1rem' }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                    error={error.includes('username')}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={error.includes('password')}
                />
                {error && (
                    <Typography variant="body2" color="error" style={{ marginBottom: '0.5rem' }}>
                        {error}
                    </Typography>
                )}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ margin: '2rem 0 1rem' }}
                    onClick={onSubmit}
                >
                    Sign In
                </Button>
            </form>
        </Container>
    );
};

export default LoginForm;
