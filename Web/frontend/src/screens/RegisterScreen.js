import React, { Component } from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../actions/userActions';
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";

const RegisterScreen = ({ location, history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [knownAs, setKnownAs] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [countries, setCountry] = useState([]);
    const [cities, setCity] = useState([]);
    const [introduction, setIntroduction] = useState('');

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [age, setAge] = useState('');

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const { userInfo, loading, error } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
        const fetchCountries = async () => {
            const { data } = await axios.get('/api/countries');
            setCountry(data)
        };
        fetchCountries();

    }, [history, userInfo, redirect])

    const calculateAge = async (dateOfBirth) => {           
        var Bdate = dateOfBirth;
        var Bday = +new Date(Bdate);
        var calculatedAge = ((Date.now() - Bday) / (31557600000));
        setAge(calculatedAge)
        console.log(age);
        console.log(calculatedAge);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        calculateAge(dateOfBirth);
        if (password !== confirmPassword) {
            setMessage('Passwords don\'t match');
        }
        else if (!dateOfBirth) {
            setMessage('Choose your date of birth please!')
        }
        else if (age < 13) {
            setMessage('You must be older than 13');
        }
        else if (!gender) {
            setMessage('Select your gender please!');
        }
        else if (!selectedCountry) {
            setMessage('Select your country please!');
        }
        else if (!selectedCity) {
            setMessage('Select your city please!');
        }
        else if (!introduction) {
            setMessage('Enter your introduction please!');
        } else {
            dispatch(register(username, password, knownAs, dateOfBirth, gender, selectedCountry, selectedCity, introduction));
        }
    }

    return (
        <FormContainer>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="" placeholder="Enter your username"
                        value={username} onChange={(e) => setUsername(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password"
                        value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="knownAs">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="" placeholder="Enter your name"
                        value={knownAs} onChange={(e) => setKnownAs(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="dateOfBirth">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" type="" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="" selected disabled hidden>Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Uknown">Unknown</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country you are in</Form.Label>
                    <Form.Control as="select" type="" value={selectedCountry}
                        onChange={(e) => {
                            setSelectedCountry(e.target.value);
                            const fetchCities = async (selectedCountry) => {
                                const { data } = await axios.get(`/api/cities/${selectedCountry}`);
                                setCity(data)
                            };
                            fetchCities(e.target.value);
                        }}>
                        {
                            countries.map((country, _id) => (
                                <option value={country.countryName} key={country._id}>
                                    {country.countryName}
                                </option>
                            ))
                        }
                        <option value="" selected disabled hidden>Select a country</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City you are in</Form.Label>
                    <Form.Control as="select" type="" value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}>
                        {
                            cities.map((city, _id) => (
                                <option value={city.cityName} key={city._id}>
                                    {city.cityName}
                                </option>
                            ))
                        }
                        <option value="" selected disabled hidden>Select a city</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="introduction">
                    <Form.Label>Introduction</Form.Label>
                    <Form.Control
                        as="textarea"
                        style={{ height: '100px' }}
                        value={introduction} onChange={(e) => setIntroduction(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Next</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Already have an account?
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen