import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from '../components/SearchBox';
import { Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UsersScreen = ({ match, history }) => {
    const [users, setUsers] = useState([]);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const keyword = match.params.keyword

    const [age, setAge] = useState([]);

    useEffect(() => {
        if (userInfo) {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const fetchUsers = async (keyword = '') => {
                const { data } = await axios.get(`/api/users/users?keyword=${keyword}`, config);
                setUsers(data);
            }

            fetchUsers(keyword);
        } else {
            history.push('/login');
        }
    }, [keyword, history, userInfo])

    return (
        <Container>
            <Row>
                <Route render={({ history }) => <SearchBox history={history} />} />
            </Row>
            <Row style={{ display: 'flex', juctifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {
                    users.map((user) => (
                        userInfo && user._id === userInfo._id ? ((<div key={user._id}>
                        </div>)) :
                            (
                                <LinkContainer to={`users/${user._id}`} key={user._id} style={{ width: '30vh', margin: '2vh' }}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title><FontAwesomeIcon className="mx-2" icon={faUser}></FontAwesomeIcon><strong>{user.username}</strong></Card.Title>
                                            <Card.Text>{user.knownAs.charAt(0).toUpperCase() + user.knownAs.slice(1) + ", "+ user.gender}</Card.Text>
                                            <Card.Text>{user.city+", "+user.country}</Card.Text>
                                            <Card.Text>{user.introduction}</Card.Text>
                                            <Button>Go to profile</Button>
                                        </Card.Body>
                                    </Card>
                                </LinkContainer>
                            )
                    ))
                }
            </Row>
        </Container >
    )
}

export default UsersScreen
