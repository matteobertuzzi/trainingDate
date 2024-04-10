import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

function SignupTrainer() {
    const { store, actions } = useContext(Context)
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()
    const { addTrainer } = actions
    const [loginError, setLoginError] = useState(null);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setValidated(true)
            const validateLog = await addTrainer(inputs);
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
                    gender: 'Male',
                    website_url: '',
                    instagram_url: '',
                    facebook_url: '',
                    x_url: '',
                    bank_iban: ''
                })
                setLoginError(null)
                navigate("/")
            }
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
        <Container className="my-5">
            <Card className="border-0 shadow-lg">
                <Card.Body>
                    <Card.Title>Registro de Entrenador</Card.Title>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nombre"
                                    value={inputs.name}
                                    onChange={changeInput}
                                    name='name'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, ingresa el nombre.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="last-name">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Apellido"
                                    value={inputs.last_name}
                                    onChange={changeInput}
                                    name='last_name'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, ingresa el apellido.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="gender">
                                <Form.Label>Género</Form.Label>
                                <Form.Select
                                    onChange={changeInput}
                                    name='gender'
                                    value={inputs.gender}
                                    required>
                                    <option value='Male'>Masculino</option>
                                    <option value='Female'>Femenino</option>
                                    <option value='Not Specified'>No especificado</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Por favor, selecciona un género.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="email">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Correo electrónico"
                                    value={inputs.email}
                                    onChange={changeInput}
                                    name='email'
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un correo electrónico válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    value={inputs.password}
                                    onChange={changeInput}
                                    name='password'
                                    required />
                                <Form.Control.Feedback type='invalid' >
                                    Por favor, ingresa la contraseña.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="phone-number">
                                <Form.Label>Número de teléfono</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Número de teléfono"
                                    value={inputs.phone_number}
                                    onChange={changeInput}
                                    name='phone_number'
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un número de teléfono válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="city">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ciudad"
                                    value={inputs.city}
                                    onChange={changeInput}
                                    name='city'
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, ingresa la ciudad.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="postal-code">
                                <Form.Label>Código postal</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Código postal"
                                    value={inputs.postal_code}
                                    onChange={changeInput}
                                    name='postal_code'
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un código postal válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="bank_iban">
                                <Form.Label>IBAN</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="IBAN bancario"
                                    value={inputs.bank_iban}
                                    onChange={changeInput}
                                    name='bank_iban'
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un IBAN válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="website_url">
                                <Form.Label>URL del sitio web</Form.Label>
                                <Form.Control
                                    type="url"
                                    placeholder="URL del sitio web"
                                    value={inputs.website_url}
                                    onChange={changeInput}
                                    name='website_url'
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="instagram_url">
                                <Form.Label>URL de Instagram</Form.Label>
                                <Form.Control
                                    type="url"
                                    placeholder="URL de Instagram"
                                    value={inputs.instagram_url}
                                    onChange={changeInput}
                                    name='instagram_url'
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="x_url">
                                <Form.Label>URL de Twitter</Form.Label>
                                <Form.Control
                                    type="url"
                                    placeholder="URL de Twitter"
                                    value={inputs.x_url}
                                    onChange={changeInput}
                                    name='x_url'
                                />
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

export default SignupTrainer;
