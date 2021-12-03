import React, { useEffect } from 'react';
import { Container, Row, InputGroup, FormControl, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import User from '../components/User';
// import axios from 'axios';
// import users from '../users';
import { adminUsersList, adminUsersDelete } from '../actions/adminActions';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';

const AdminUsersScreen = ({ history }) => {
    const dispatch = useDispatch();

    const adminUserList = useSelector(state => state.adminUserList);
    const { loading, error, users } = adminUserList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const adminUserDelete = useSelector(state => state.adminUserDelete);
    const { success: successDelete } = adminUserDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(adminUsersList());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            dispatch(adminUsersDelete(id));
        }
    }

    return (
        <>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Container>
                    <Row>
                        <InputGroup className="my-5">
                            <FormControl placeholder="Find a user" />
                            <Button variant="success"><FontAwesomeIcon className="mx-2" icon={faSearch}></FontAwesomeIcon></Button>
                        </InputGroup>
                    </Row>
                    <Row style={{ display: 'flex', juctifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                        {
                            users.map((user) => (
                                <Card style={{ width: '25%', margin: '2%' }} key={user._id}>
                                    <Card.Body>
                                        <Card.Title>{user.username}</Card.Title>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}><Button variant="light">Edit account</Button></LinkContainer>
                                        <Button variant="danger" onClick={() => deleteHandler(user._id)}>Delete account</Button>
                                    </Card.Body>
                                </Card>
                            ))
                        }
                    </Row>
                </Container>
            )}
        </>
    )
}

export default AdminUsersScreen