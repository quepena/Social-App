import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button, Form } from 'react-bootstrap';
import { useSelector } from "react-redux";
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const UserProfileScreen = ({ match, history }) => {
    const [user, setUser] = useState({});

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [conversations, setConversations] = useState([]);

    const [age, setAge] = useState([]);

    const [posts, setPosts] = useState([]);

    const [title, setTitle] = useState('');

    const [contents, setContents] = useState('');

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

            const calculateAge = async (dateOfBirth) => {
                var Bdate = dateOfBirth;
                var Bday = +new Date(Bdate);
                var calculatedAge = ((Date.now() - Bday) / (31557600000));
                setAge(calculatedAge)
            }
            calculateAge(userInfo.dateOfBirth)
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
                if (user) {
                    const fetchPosts = async () => {
                        const res = await axios.get("/api/blogs/" + match.params.id)
                        setPosts(res.data)
                    }
                    fetchPosts();
                }
            } else {
                const fetchUser = async () => {
                    const res = await axios.get(`/api/users/users/${userInfo._id}`);
                    setUser(res.data);
                }
                fetchUser();
                const fetchPosts = async () => {
                    const res = await axios.get("/api/blogs/" + userInfo._id)
                    setPosts(res.data)
                }
                fetchPosts();
            }
        } else {
            history.push('/login');
        }
    }, [history, userInfo])

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

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

    const postHandler = async (e) => {
        e.preventDefault();
        const post = {
            title: title,
            contents: contents,
            userId: userInfo._id,
        }

        await axios.post(`/api/blogs`, post, config)
        setPosts([...posts])
        window.location.reload()
    }

    return (
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Row style={{ marginTop: "2vh", width: "70vh" }}>
                {
                    userInfo && userInfo._id !== user._id ?
                        (
                            <Row>
                                <Card style={{ display: 'flex', juctifyContent: 'left', alignItems: 'center', padding: "10vh" }}>
                                    <Card.Title><FontAwesomeIcon className="mx-2" icon={faUser}></FontAwesomeIcon><strong>{user.username}</strong></Card.Title>
                                    <Card.Text>{user.knownAs + ", " + Math.floor(age) + ", " + user.gender}</Card.Text>
                                    <Card.Text>{user.city + ", " + user.country}</Card.Text>
                                    <Card.Text>{user.introduction}</Card.Text>
                                    <LinkContainer to="/messages" style={{ width: '80%', marginTop: "2vh" }}><Button onClick={submitHandler} type="submit" variant="primary"><FontAwesomeIcon className="mx-2" icon={faPaperPlane}></FontAwesomeIcon>Send a message</Button></LinkContainer>
                                </Card>
                            </Row>
                        ) :
                        (
                            <Row>
                                <Card style={{ display: 'flex', juctifyContent: 'left', alignItems: 'center', padding: "10vh" }}>
                                    <Card.Title><FontAwesomeIcon className="mx-2" icon={faUser}></FontAwesomeIcon><strong>{userInfo.username}</strong></Card.Title>
                                    <Card.Text>{userInfo.knownAs + ", " + Math.floor(age) + ", " + userInfo.gender}</Card.Text>
                                    <Card.Text>{userInfo.city + ", " + userInfo.country}</Card.Text>
                                    <Card.Text>{userInfo.introduction}</Card.Text>
                                </Card>
                                <Row style={{ padding: "5vh" }}>
                                    <Form onSubmit={postHandler}>
                                        <Form.Control type="" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                                        <Form.Control onChange={(e) => setContents(e.target.value)} value={contents} as="textarea" style={{ height: '100px' }} placeholder="Write a new post" />
                                        <Button type="submit" className="my-4" variant="primary">Publish</Button>
                                    </Form>
                                </Row>
                            </Row>
                        )
                }
                <h2 style={{ textAlign: "center", marginTop: "3vh" }}>{user.username}'s posts:</h2>
                <div style={{ display: 'flex', juctifyContent: 'center', alignItems: 'center', flexWrap: "wrap", padding: "10vh", marginTop: "2vh" }}>
                    {
                        posts.map((post) => (
                            <Card key={post._id} style={{ width: "100vh", marginBottom: "2vh" }}>
                                <Card.Body>
                                    <Card.Title><strong>{post.title}</strong></Card.Title>
                                    <Card.Text>{post.contents}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>
            </Row>
        </Container >
    )
}

export default UserProfileScreen
