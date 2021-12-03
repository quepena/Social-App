import React from 'react'
import { Card } from 'react-bootstrap'
import { format } from 'timeago.js'

const ChatMessage = ({ chatMessage, own }) => {
    return (
        <Card className={own ? "chatMessageOwn" : "chatMessage"} key={chatMessage._id}>
            <Card.Body>
                <Card.Title>{chatMessage.contents}</Card.Title>
                <Card.Footer>{format(chatMessage.date)}</Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default ChatMessage