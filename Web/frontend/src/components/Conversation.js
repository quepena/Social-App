import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Card, Container, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import ChatMessage from '../components/ChatMessage';
import { io } from 'socket.io-client'

const Conversation = ({ conversation }) => {
    const [friend, setFriend] = useState([]);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    useEffect(() => {
        const friend = conversation.participants.find((m) => m !== userInfo._id)

        const fetchUsers = async (friend) => {
            const res = await axios(`/api/users/users/${friend}`);
            setFriend(res.data)
        }
        fetchUsers(friend)

    }, [userInfo, conversation])

    return (
        <Card style={{margin: "2% 0 2% 0"}}>
            <Card.Body>
                <Card.Title>{friend.username}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default Conversation
