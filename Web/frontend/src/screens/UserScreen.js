import React from 'react'
import { getUserDetails, updateUserProfile, deleteUserAccount } from '../actions/userActions'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import axios from 'axios';

const UserScreen = ({ location, history }) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [languages, setLanguage] = useState([]);

    // const [selectedNativeLanguage, setSelectedNativeLanguage] = useState('');
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
        // const fetchLanguages = async () => {
        //     const { data } = await axios.get('/api/languages');
        //     setLanguage(data)
        // };
        // fetchLanguages();
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
            <Form onSubmit={submitHandler}>
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
                {/* <Form.Group controlId="nativeLanguage">
                    <Form.Label>Native Language</Form.Label>
                    <Form.Control as="select" type="" value={selectedNativeLanguage}
                        onChange={(e) => setSelectedNativeLanguage(e.target.value)}>
                        {
                            languages.map((language) => (
                                <option value={language.languageName} key={language._id}>
                                    {language.languageName}
                                </option>
                            ))
                        }
                        <option value="" selected disabled hidden>Select a language</option>
                    </Form.Control>
                </Form.Group> */}
                {/* <Form.Group controlId="isLearning">
                    <Form.Label>Language you want to learn</Form.Label>
                    <Form.Control as="select" type="" value={selectedIsLearning}
                        onChange={(e) => setSelectedIsLearning(e.target.value)}>
                        {
                            languages.map((language) => (
                                <option value={language.languageName} key={language._id}>
                                    {language.languageName}
                                </option>
                            ))
                        }
                    </Form.Control>
                </Form.Group> */}
                <Button variant="primary" type="submit">Update profile</Button>
            </Form>
            <Form onSubmit={deleteHandler}>
                <Button variant="danger" type="submit">Delete account</Button>
            </Form>
        </FormContainer>
    )
}

export default UserScreen
