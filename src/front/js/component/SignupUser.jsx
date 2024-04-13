import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import {Button, Card, Col, Form, Container, Row} from 'react-bootstrap/';


function SignupUser() {
    const { store, actions } = useContext(Context)
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()
    const { addUser } = actions
    const [loginError, setLoginError] = useState(null);
    const [inputs, setInputs] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        city: '',
        postal_code: '',
        phone_number: '',
        gender: 'Male'
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setValidated(true);
            const validateLog = await addUser(inputs);
            if (!validateLog) {
                setLoginError('Los datos ingresados no son correctos. Por favor, inténtalo de nuevo.');
            } else {
                setInputs({
                    name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    city: '',
                    postal_code: '',
                    phone_number: '',
                    gender: 'Male'
                });
                setLoginError(null)
                navigate("/")
            }
        };
    }

    const changeInput = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    return (
        <Container className="my-5">
            <Card className="border-0 shadow-lg">
                <Card.Body>
                    <Card.Title>Registro de Usuario</Card.Title>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="user-name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nombre"
                                    value={inputs.name || ""}
                                    onChange={changeInput}
                                    name='name'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, ingresa el nombre.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="user-last-name">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Apellido"
                                    value={inputs.last_name || ""}
                                    onChange={changeInput}
                                    name='last_name'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, ingresa el apellido.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="user-gender">
                                <Form.Label>Género</Form.Label>
                                <Form.Select
                                    onChange={changeInput}
                                    name='gender'
                                    value={inputs.gender || ""}
                                    required>
                                    <option value='Male'>Masculino</option>
                                    <option value='Female'>Femenino</option>
                                    <option value='Not Specified'>No especificado</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="user-email">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Correo electrónico"
                                    value={inputs.email || ""}
                                    onChange={changeInput}
                                    name='email'
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un correo electrónico válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="user-password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    value={inputs.password || ""}
                                    onChange={changeInput}
                                    name='password'
                                    required />
                                <Form.Control.Feedback type='invalid' >
                                    Por favor, ingresa la contraseña.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="user-phone-number">
                                <Form.Label>Número de teléfono</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Número de teléfono"
                                    value={inputs.phone_number || ""}
                                    onChange={changeInput}
                                    name='phone_number'
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un número de teléfono válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="user-city">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ciudad"
                                    value={inputs.city || ""}
                                    onChange={changeInput}
                                    name='city'
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona una ciudad.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="user-postal-code">
                                <Form.Label>Código postal</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Código postal"
                                    value={inputs.postal_code || ""}
                                    onChange={changeInput}
                                    name='postal_code'
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un código postal.
                                </Form.Control.Feedback>
                            </Form.Group>
                            {loginError && <div className="text-danger mt-2">{loginError}</div>}
                        </Row>
                        <div className='text-center'>
                            <Button type="submit">Registrarse</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SignupUser;
