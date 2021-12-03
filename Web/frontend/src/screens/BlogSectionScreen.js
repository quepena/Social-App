import React, { useState, useEffect } from 'react'
import { Card, Container, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from "react-redux";
import axios from 'axios'

const BlogSectionScreen = ({ match }) => {
    const [posts, setPosts] = useState([]);

    const [title, setTitle] = useState('');

    const [contents, setContents] = useState('');

    const [sectionId, setSectionId] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await axios.get(`/api/blogs/${match.params.id}`);
            setPosts(data);
            setSectionId(match.params.id)
        }
        fetchPosts();

    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        const post = {
            title: title,
            contents: contents,
            userId: userInfo._id,
            sectionId: sectionId
        }

        const res = await axios.post(`/api/blogs/${sectionId}`, post, config)
        setPosts([...posts])
        window.location.reload()
    }

    return (
        <Container>
            <Form onSubmit={submitHandler}>
                <Form.Control type="" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                <Form.Control onChange={(e) => setContents(e.target.value)} value={contents} as="textarea" placeholder="Write a new post" />
                <Button type="submit" className="my-4" variant="success">Publish</Button>
            </Form>
            <Card.Body>
                {
                    posts.map((post) => (
                        <Card key={post._id}>
                            <Card.Body>
                                <LinkContainer to={`/blogs/${post.sectionId}`}><Card.Header>{post.sectionId}</Card.Header></LinkContainer>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.contents}</Card.Text>
                                <Button>Comment</Button>
                            </Card.Body>
                        </Card>
                    ))
                }
            </Card.Body>
        </Container>
    )
}

export default BlogSectionScreen
