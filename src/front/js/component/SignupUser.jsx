import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import { Button, Card, Col, Form, Container, Row, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap/';
import { RiArrowGoBackLine } from "react-icons/ri";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


function SignupUser() {
    const { store, actions } = useContext(Context)
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()
    const { addUser, setActiveNavTab } = actions
    const [show, setShow] = useState(false);
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

    const handleClose = () => {
        setShow(false)
        navigate("/")
    }

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
                setShow(true)
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
                                    required
                                    isInvalid={inputs.email && !/^\S+@\S+\.\S+$/.test(inputs.email)} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un correo electrónico válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='d-flex flex-column' as={Col} md="3" controlId="user-password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    value={inputs.password || ""}
                                    onChange={changeInput}
                                    name='password'
                                    required
                                    pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$"
                                    isInvalid={inputs.password && !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/.test(inputs.password)}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    La contraseña debe tener al menos 6 caracteres, incluyendo al menos un número, un carácter especial, y una letra.
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
                                    required
                                    pattern="[0-9]{9,}"
                                    isInvalid={!/^([0-9]{9,})?$/.test(inputs.phone_number)} />
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
                                    required
                                    pattern="[0-9]{5}"
                                    isInvalid={!/^([0-9]{5})?$/.test(inputs.postal_code)} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un código postal.
                                </Form.Control.Feedback>
                            </Form.Group>
                            {loginError && <div className="text-danger mt-2">{loginError}</div>}
                        </Row>
                        <div className='d-flex flex-row gap-2 justify-content-center align-items-center mt-3'>
                            <Button variant="danger" onClick={() => setActiveNavTab("home")} as={Link} to={"/"}>Volver a la Home</Button>
                            <Button variant='success' type="submit">Registrarse</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <Modal
                show={show}
                size="md"
                centered
                variant="success"
                className='d-flex flex-column justify-content-center align-items-center'
            >
                <Modal.Header className='d-flex justify-content-center align-items-center'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Registracion exitosa!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center align-items-center'>
                    <p>
                        ¡Registro completado con éxito! Se le enviará un correo electrónico para confirmar su dirección.
                    </p>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center align-items-center'>
                    <Button onClick={handleClose}>
                        Volver a la Home
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    );
}

export default SignupUser;
