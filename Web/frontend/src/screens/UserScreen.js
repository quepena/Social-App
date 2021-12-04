import React from 'react'
import { getUserDetails, updateUserProfile, deleteUserAccount } from '../actions/userActions'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Form, Button, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserScreen = ({ history }) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [message, setMessage] = useState(null);

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const userDeleteProfile = useSelector(state => state.userDeleteProfile);
    const { success: successDelete } = userDeleteProfile;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.username) {
                dispatch(getUserDetails('profile'))
            } else {
                setUsername(user.username)
            }
        }
    }, [dispatch, history, userInfo, user, successDelete])

    const deleteHandler = (e, id) => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            dispatch(deleteUserAccount(userInfo._id));
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords don\'t match');
        } else {
            dispatch(updateUserProfile({ id: user._id, username, password }));
        }
    }

    return (
        <FormContainer>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile successfully updated!</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} style={{ marginTop: "3vh" }}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="" placeholder="Enter your username"
                        value={username} onChange={(e) => setUsername(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password"
                        value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Col style={{ marginTop: "3vh", display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "norap" }}>
                    <Button variant="primary" type="submit">Update profile</Button>
                    <Button onClick={deleteHandler} variant="danger" type="submit">Delete account</Button>
                </Col>
            </Form>
        </FormContainer>
    )
}

export default UserScreen
