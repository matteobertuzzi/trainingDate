import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js";
import { Button, Card, Col, Container, Form, Row, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap/';
import { useNavigate, Link } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


function SignupTrainer() {
    const { store, actions } = useContext(Context)
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()
    const { addTrainer, setActiveNavTab } = actions
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
        gender: 'Male',
        website_url: '',
        instagram_url: '',
        facebook_url: '',
        x_url: '',
        bank_iban: ''
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
            const validateLog = await addTrainer(inputs);
            if (!validateLog) {
                setLoginError('Los datos ingresados no son correctos. Por favor, inténtalo de nuevo.');

            } else {
                setValidated(true)
                setShow(true)
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
                            <Form.Group className="mb-2" as={Col} md="4" controlId="name">
                                <Form.Label><span>Nombre</span><span className='text-danger'>*</span></Form.Label>
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
                            <Form.Group className="mb-2" as={Col} md="4" controlId="last-name">
                                <Form.Label><span>Apellido</span><span className='text-danger'>*</span></Form.Label>
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
                            <Form.Group className="mb-2" as={Col} md="6" controlId="email">
                                <Form.Label><span>Correo electrónico</span><span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Correo electrónico"
                                    value={inputs.email}
                                    onChange={changeInput}
                                    name='email'
                                    required
                                    isInvalid={inputs.email && !/^\S+@\S+\.\S+$/.test(inputs.email)} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un correo electrónico válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2" as={Col} md="3" controlId="password">
                                <Form.Label><span>Contraseña</span><span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    value={inputs.password}
                                    onChange={changeInput}
                                    name='password'
                                    required
                                    pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$"
                                    isInvalid={inputs.password && !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(inputs.password)}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    La contraseña debe tener al menos 8 caracteres, incluyendo al menos un número, un carácter especial, y una letra.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="phone-number">
                                <Form.Label><span>Número de teléfono</span><span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Número de teléfono"
                                    value={inputs.phone_number}
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
                            <Form.Group className="mb-2" as={Col} md="4" controlId="city">
                                <Form.Label><span>Ciudad</span><span className='text-danger'>*</span></Form.Label>
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
                            <Form.Group className="mb-2" as={Col} md="4" controlId="postal-code">
                                <Form.Label><span>Código postal</span><span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Código postal"
                                    value={inputs.postal_code}
                                    onChange={changeInput}
                                    name='postal_code'
                                    required
                                    pattern="[0-9]{5}"
                                    isInvalid={!/^([0-9]{5})?$/.test(inputs.postal_code)} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un código postal válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="bank_iban">
                                <Form.Label><span>IBAN</span><span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="IBAN bancario"
                                    value={inputs.bank_iban}
                                    onChange={changeInput}
                                    name='bank_iban'
                                    required
                                    pattern="[A-Z]{2}[0-9]{22}"
                                    isInvalid={inputs.bank_iban && !/^[A-Z]{2}[0-9]{22}$/.test(inputs.bank_iban)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, proporciona un IBAN válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className="mb-2" as={Col} md="4" controlId="website_url">
                                <Form.Label>URL del sitio web</Form.Label>
                                <Form.Control
                                    type="url"
                                    placeholder="URL del sitio web"
                                    value={inputs.website_url}
                                    onChange={changeInput}
                                    name='website_url'
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" as={Col} md="4" controlId="instagram_url">
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
                        <div>
                            <p className="text-danger m-0">* Campo requerido</p>
                        </div>
                        <div className='d-flex flex-row gap-2 justify-content-center align-items-center mt-4'>
                            <Button variant='outline-secondary' onClick={() => setActiveNavTab("home")} as={Link} to={"/"}>Volver a la Home</Button>
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
                <Modal.Header className='d-flex justify-content-center align-items-center bg-primary text-white'>
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
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Volver a la Home
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default SignupTrainer;
