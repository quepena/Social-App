import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../actions/userActions';
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginScreen = ({ location, history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const { userInfo, loading, error } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    }

    return (
        <FormContainer>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler} style={{ marginTop: "3vh", marginBottom: "3vh" }}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="" placeholder="Enter your username"
                        value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password"
                        value={password} onChange={(e) => setPassword(e.target.value)} style={{marginBottom: "3vh"}}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Sign in</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Don't have an account yet?
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
