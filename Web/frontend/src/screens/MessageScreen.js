import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Card, Container, Form, Button } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { messagesListByConversation, conversationsListByUser } from '../actions/messageActions';
// import Loader from "../components/Loader";
// import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import ChatMessage from '../components/ChatMessage';
import { io } from 'socket.io-client'
import Conversation from '../components/Conversation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const MessageScreen = ({ history }) => {
    const dispatch = useDispatch();

    const [conversations, setConversations] = useState([]);

    const [currentConversation, setCurrentConversation] = useState(null);

    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState('');
    const [arrivedMessage, setArrivedMessage] = useState(null);

    const [friend, setFriend] = useState([]);

    const socket = useRef();

    const scrollRef = useRef();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    useEffect(() => {
        if (userInfo) {
            socket.current = io("ws://127.0.0.1:8900"); //change it
            // socket.current = io("ws://192.168.0.105:8900");
            socket.current.on("getMessage", data => {
                setArrivedMessage({
                    sender: data.sender,
                    contents: data.contents,
                    date: Date.now(),
                })
            })
        } else {
            history.push('/login');
        }
    }, [userInfo, history])

    useEffect(() => {
        arrivedMessage && currentConversation?.participants.includes(arrivedMessage.sender) &&
            setMessages(prev => [...prev, arrivedMessage])

    }, [arrivedMessage, currentConversation])

    useEffect(() => {
        if (userInfo) {
            socket.current.emit("addUser", userInfo._id);
            socket.current.on("getUsers", users => {
                console.log(users);
            });
        } else {
            history.push('/login');
        }
    }, [userInfo, history])

    useEffect(() => {
        if (userInfo) {

            const fetchConversations = async (id) => {
                try {
                    const res = await axios.get(`/api/conversations/${id}`, config)
                    console.log(res.data);
                    setConversations(res.data)
                } catch (error) {
                    console.log(error);
                }
            }
            fetchConversations(userInfo._id);
        } else {
            history.push('/login');
        }
    }, [userInfo, history])

    useEffect(() => {
        if (userInfo) {
            const fetchMessages = async (id) => {
                const { data } = await axios.get(`/api/messages/${id}`, config)
                setMessages(data)
            }
            fetchMessages(currentConversation?._id);
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo, currentConversation])

    useEffect(() => {
        if (userInfo) {
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: "auto" })
            }
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo, messages])

    const submitHandler = async (e) => {
        e.preventDefault();

        const message = {
            sender: userInfo._id,
            contents: newMessage,
            conversationId: currentConversation._id,
        }
        console.log(message);

        const reciever = currentConversation.participants.find(m => m !== userInfo._id)

        socket.current.emit("sendMessage", {
            sender: userInfo._id,
            reciever,
            contents: newMessage
        })

        const res = await axios.post('/api/messages', message, config)
        setMessages([...messages, res.data])
    }

    return (
        <>
            {userInfo ? (
                <Container>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={4} style={{ border: "solid #158cba 3px", borderRadius: "2%", margin: "1%" }}>
                                    {
                                        conversations.map((c) => (
                                            <div onClick={() => {
                                                setCurrentConversation(c);
                                            }}><Conversation conversation={c} />
                                            </div>
                                        ))
                                    }

                                </Col>
                                <Col>
                                    {currentConversation ? (
                                        <Col>
                                            <Col className="chatBox">

                                                <Col md={8} className="chatBoxWrapper">
                                                    {
                                                        messages.map((message) => (
                                                            <div ref={scrollRef}>
                                                                <ChatMessage chatMessage={message} own={message.sender === userInfo._id} conversation={currentConversation} />
                                                            </div>
                                                        ))
                                                    }

                                                </Col>

                                            </Col>
                                            <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                                <Form.Control onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="mx-2" as="textarea" placeholder="Write a message here" />
                                                <Button onClick={submitHandler} type="submit" variant="primary"><FontAwesomeIcon className="mx-2" icon={faPaperPlane}></FontAwesomeIcon></Button>
                                            </Col>
                                        </Col>
                                    ) : (
                                        <p style={{ fontSize: "25px" }}>Choose a conversation to chat!</p>
                                    )}
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            ) : (
                <div></div>
            )}
        </>
    )
}

export default MessageScreen
