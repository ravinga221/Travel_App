import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

import loginImg from '../assets/images/login.jpeg';
import userIcon from '../assets/images/user.png';

import { AuthContext } from '../context/AuthContex'; 
import { BASE_URL } from '../utils/config';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => { 
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if credentials are filled
        if (!credentials.email || !credentials.password) {
            alert('Please fill in all fields');
            return;
        }
        
        dispatch({ type: 'LOGIN_START' })
        
        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(credentials),
            })
            
            const result = await res.json()

            if (!res.ok) {
                alert(result.message)
                dispatch({ type: 'LOGIN_FAILURE', payload: result.message })
                return;
            }

            console.log(result.data);
            dispatch({ type: 'LOGIN_SUCCESS', payload: result.data })
            navigate('/')
            
        } catch (err) {
            alert(err.message);
            dispatch({ type: 'LOGIN_FAILURE', payload: err.message })
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className="m-auto">
                        <div className="login_container d-flex justify-content-between">
                            <div className="login_img">
                                <img src={loginImg} alt="login" />
                            </div>

                            <div className="login_form">
                                <div className="user">
                                    <img src={userIcon} alt="user" />
                                </div>
                                <h2>Login</h2>

                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input 
                                            type='email' 
                                            placeholder='Email' 
                                            required 
                                            id="email"
                                            value={credentials.email}
                                            onChange={handleChange} 
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input 
                                            type='password' 
                                            placeholder='Password' 
                                            required 
                                            id="password"
                                            value={credentials.password}
                                            onChange={handleChange} 
                                        />
                                    </FormGroup>

                                    <Button 
                                        className="btn secondary__btn auth__btn" 
                                    >
                                        Login
                                    </Button>
                                </Form>
                                <p>Don't have an account? <Link to='/register'>Create</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
};

export default Login;