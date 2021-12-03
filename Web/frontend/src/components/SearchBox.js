import React, { Component } from 'react'
import { useState } from "react"
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="my-5">
            <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder="Find a user by name, username, country or a city" />
            <Button type='submit' variant="primary"><FontAwesomeIcon className="mx-2" icon={faSearch}></FontAwesomeIcon></Button>
        </Form>
    )
}

export default SearchBox
