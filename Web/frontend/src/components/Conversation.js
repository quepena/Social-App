import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import {  useSelector } from "react-redux";
import axios from 'axios';

const Conversation = ({ conversation }) => {
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
        <Card style={{margin: "2% 0 2% 0"}}>
            <Card.Body>
                <Card.Title>{friend.username}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default Conversation
