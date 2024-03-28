import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function SignupTrainer() {
    const { store, actions } = useContext(Context)
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        city: '',
        postal_code: '',
        phone_number: '',
        gender: 'Male',
        website_url: '',
        instagram_url: '',
        facebook_url: '',
        x_url: '',
        bank_iban: ''
    })

    let newTrainer = {}

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(false);
            newTrainer = {
                name: inputs.name,
                last_name: inputs.last_name,
                email: inputs.email,
                password: inputs.password,
                city: inputs.city,
                postal_code: parseInt(inputs.postal_code),
                phone_number: inputs.phone_number,
                gender: inputs.gender === '' ? 'Male' : inputs.gender,
                website_url: inputs.website_url,
                instagram_url: inputs.instagram_url,
                facebook_url: inputs.facebook_url,
                x_url: inputs.x_url,
                bank_iban: inputs.bank_iban
            }
            console.log(newTrainer)
            actions.addTrainer(newTrainer);
            setInputs({
                name: '',
                last_name: '',
                email: '',
                password: '',
                city: '',
                postal_code: '',
                phone_number: '',
                gender: 'Male',
                website_url: '',
                instagram_url: '',
                facebook_url: '',
                x_url: '',
                bank_iban: ''
            })
        }
    };

    const changeInput = (event) => {
        event.persist();
        const { name, value } = event.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="name">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        value={inputs.name}
                        onChange={changeInput}
                        name='name'
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide first name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="last-name">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        value={inputs.last_name}
                        onChange={changeInput}
                        name='last_name'
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide last name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        id='gender'
                        onChange={changeInput}
                        name='gender'
                        value={inputs.gender}
                        required>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Not Specified'>Not Specified</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={inputs.email}
                        onChange={changeInput}
                        name='email'
                        required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={inputs.password}
                        onChange={changeInput}
                        name='password'
                        required />
                    <Form.Control.Feedback type='invalid' >
                        Please enter password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="phone-number">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Phone number"
                        value={inputs.phone_number}
                        onChange={changeInput}
                        name='phone_number'
                        required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid phone number.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="City"
                        value={inputs.city}
                        onChange={changeInput}
                        name='city'
                        required />
                    <Form.Control.Feedback type="invalid">
                        Please provide city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="postal-code">
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Postal code"
                        value={inputs.postal_code}
                        onChange={changeInput}
                        name='postal_code'
                        required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a postal code.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="bank_iban">
                    <Form.Label>IBAN</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Bank IBAN"
                        value={inputs.bank_iban}
                        onChange={changeInput}
                        name='bank_iban'
                        required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid IBAN.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="website_url">
                    <Form.Label>Website url</Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Website url"
                        value={inputs.website_url}
                        onChange={changeInput}
                        name='website_url'
                    />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="instagram_url">
                    <Form.Label>Instagram URL</Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Instagram url"
                        value={inputs.instagram_url}
                        onChange={changeInput}
                        name='instagram_url'
                    />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="x_url">
                    <Form.Label>Twitter URL</Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Twitter url"
                        value={inputs.x_url}
                        onChange={changeInput}
                        name='x_url'
                    />
                </Form.Group>
            </Row>
            <Button type="submit">Sign up</Button>
        </Form>
    );
}

export default SignupTrainer;


