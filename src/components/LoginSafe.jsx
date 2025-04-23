import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/loginsafe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok && email === "admin") {
                localStorage.setItem('token', data);
                navigate('/clients');
            } else {
                console.error(data.error || "Login failed");
            }
        } catch (err) {
            console.error("Error during login", err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className="p-4" style={{ maxWidth: 500, width: '100%' }}>
                <h3 className="mb-3 text-center">Login</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="loginEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="loginPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
