import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';

const UserProfileScreen = ({ match, history }) => {
    const [user, setUser] = useState({});

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        if (userInfo) {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const fetchConversations = async (id) => {
                const { data } = await axios.get(`/api/conversations/${id}`, config)
                setConversations(data)
            }
            fetchConversations(userInfo._id);
        } else {
            history.push('/login');
        }

    }, [history, userInfo])

    useEffect(() => {
        if (userInfo) {
            if (match.params.id !== 'profile') {
                const fetchUser = async () => {
                    const res = await axios.get(`/api/users/users/${match.params.id}`);
                    setUser(res.data);
                }
                fetchUser();
            } else {
                const fetchUser = async () => {
                    const res = await axios.get(`/api/users/users/${userInfo._id}`);
                    setUser(res.data);
                }
                fetchUser();
            }
        } else {
            history.push('/login');
        }
    }, [history, userInfo])

    const submitHandler = async (e) => {
        if (userInfo) {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            let flag = true
            if (conversations.length !== 0) {
                conversations.map(conv => {
                    console.log(conversations);
                    console.log(conv);
                    const friend = conv.participants.find((m) => m !== userInfo._id)
                    console.log(friend);
                    console.log(match.params.id);
                    if (match.params.id === friend) {
                        flag = false
                    }
                })
            } else {
                flag = true
            }
            console.log(flag);
            
            if (flag === true) {
                const conversation = {
                    sender: userInfo._id,
                    reciever: user._id
                }
                const res = await axios.post('/api/conversations', conversation, config)
                setConversations([...conversations, res.data])
            }
        } else {
            history.push('/login');
        }
    }

    return (
        <Container>
            <Row style={{ display: 'flex', juctifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {
                    userInfo && userInfo._id !== user._id ?
                        (<Card>
                            <Card.Title>{user.username}</Card.Title>
                            <LinkContainer to="/messages" style={{ width: '20%' }}><Button onClick={submitHandler} type="submit" variant="primary">Send</Button></LinkContainer>
                        </Card>) :
                        (<Card>
                            <Card.Title>{user.username}</Card.Title>
                        </Card>)
                }
            </Row>
        </Container>
    )
}

export default UserProfileScreen
