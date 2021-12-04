import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container, Nav, NavDropdown, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, NavLink } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);

    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Row style={{display: 'flex', alignItems: 'center'}}>
                        <Col sm={5}>
                            <LinkContainer to="/"><Navbar.Brand>Social-App</Navbar.Brand></LinkContainer>
                        </Col>
                        <Col sm={5}>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                {userInfo ? (
                                    <Nav className="me-auto">
                                        <LinkContainer to="/">
                                            <Nav.Link>Friends</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/messages">
                                            <Nav.Link>Messages</Nav.Link>
                                        </LinkContainer>
                                    </Nav>
                                ) : (<div>
                                </div>)}
                            </Navbar.Collapse>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <Nav>
                                {userInfo ? (
                                    <NavDropdown title={"Hello, " + userInfo.knownAs.charAt(0).toUpperCase() + userInfo.knownAs.slice(1)} id='name'>
                                        <LinkContainer to="/users/profile"><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer>
                                        <NavDropdown.Divider />
                                        <LinkContainer to="/profile/edit"><NavDropdown.Item>Edit profile</NavDropdown.Item></LinkContainer>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (<LinkContainer to="/login">
                                    <Nav.Link>Sign in</Nav.Link>
                                </LinkContainer>)
                                }
                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title={"Admin "} id='adminmenu'>
                                        <LinkContainer to="/admin/users"><NavDropdown.Item>Users</NavDropdown.Item></LinkContainer>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header
