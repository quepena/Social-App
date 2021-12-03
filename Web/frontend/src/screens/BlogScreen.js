import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faComment, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';

const BlogScreen = ({ history }) => {
    const [posts, setPosts] = useState([]);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            const fetchPosts = async (id) => {
                const { data } = await axios.get(`/api/blogs/blogs/${id}`)
                setPosts(data)
                console.log(data);
            }
            fetchPosts(userInfo._id);
        } else {
            history.push('/login');
        }
    }, [history, userInfo])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Card className="my-5">
                            <Card.Body>
                                {
                                    posts.map((post) => (
                                        <Card key={post._id}>
                                            <Card.Body>
                                                <Card.Title>{post.title}</Card.Title>
                                                <Card.Footer>{post.contents}</Card.Footer>
                                            </Card.Body>
                                        </Card>
                                    ))
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BlogScreen

