import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { Card } from 'react-bootstrap'
import { useSelector } from "react-redux";
import axios from 'axios';

const ChatMessage = ({ chatMessage, own, conversation }) => {
    const [friend, setFriend] = useState([]);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        const friend = conversation.participants.find((m) => m !== userInfo._id)

        const fetchUsers = async (friend) => {
            const res = await axios(`/api/users/users/${friend}`);
            setFriend(res.data)
        }
        fetchUsers(friend)

    }, [userInfo, conversation])

    return (
        <Card className={own ? "chatMessageOwn" : "chatMessage"} style={{ marginBottom: "2vh" }} key={chatMessage._id}>
            <Card.Body>
                { own ? <Card.Header>You</Card.Header> : <Card.Header>{friend.username}</Card.Header>}
                <Card.Title>{chatMessage.contents}</Card.Title>
                <Card.Footer>{format(chatMessage.date)}</Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default ChatMessage