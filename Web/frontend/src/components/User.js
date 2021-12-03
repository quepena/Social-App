import React from 'react'
import { Card, Button } from 'react-bootstrap'

const User = ({ user }) => {
    return (
        <Card style={{ width: '20%' }} className="p-3 m-3">
            <Card.Body>
                <Card.Title>{user.knownAs}</Card.Title>
                <Card.Img src={user.photo} />
                <Card.Text className="my-3">{user.introduction}</Card.Text>
                <Card.Text className="py-2">Learning: {user.isLearning}</Card.Text>
                <Button variant="success">Account</Button>
            </Card.Body>
        </Card>
    )
}

export default User

