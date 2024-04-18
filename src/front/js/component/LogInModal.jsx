import React, { useState, useContext } from "react";
import { Modal, Button, Col, Form, Row, Nav, CloseButton, FloatingLabel } from 'react-bootstrap/';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaCheckCircle } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export const LogInModal = ({ show, onHide }) => {
    const { actions } = useContext(Context)
    const { loginUser, setLogged } = actions
    const [validated, setValidated] = useState(false)
    const [activeTab, setActiveTab] = useState("");
    const [loginError, setLoginError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const handleChange = (e) => {
        e.persist();
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const userType = activeTab === "users" ? "users" : "trainers";
            const validateLog = await loginUser(inputs, userType);
            if (!validateLog) {
                setValidated(false);
                setLoginError('Los datos ingresados no son correctos. Por favor, inténtalo de nuevo.');
            } else {
                setValidated(true);
                setLogged(true);
                setInputs({
                    email: '',
                    password: ''
                });
                setLoginError(null)
                setActiveTab("")
                onHide();
            }
        }
    };

    return (
        <Modal show={show} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className="bg-primary">
                <Modal.Title id="contained-modal-title-vcenter">
                    Log In
                </Modal.Title>
                <CloseButton onClick={onHide}></CloseButton>
            </Modal.Header>
            <p className="text-center p-2 m-0">Elige cómo deseas iniciar sesión:</p>
            <Nav defaultActiveKey={activeTab} variant="pills" justify className="d-flex flex-row justify-content-betweeen px-3">
                <Nav.Item>
                    <Nav.Link eventKey="users" onClick={() => handleTabChange("users")}>Usuario<FaCheckCircle className={`ms-2 ${activeTab === "users" ? "" : "d-none"}`} /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="trainers" onClick={() => handleTabChange("trainers")}>Entrenador<FaCheckCircle className={`ms-2 ${activeTab === "trainers" ? "" : "d-none"}`} /></Nav.Link>
                </Nav.Item>
            </Nav>
            <Modal.Body className="w-100 d-flex flex-column p-20">
                <Form className="mb-2" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Form.Group as={Col} md="12" controlId="validationEmail">
                            <FloatingLabel controlId="validationLoginEmail" label="Email address">
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="name@example.com"
                                    value={inputs.email || ""}
                                    onChange={handleChange}
                                    name="email"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter an email.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="position-relative w-100" as={Col} md="12" controlId="validationSignupPassword">
                            <FloatingLabel controlId="validationSignupPassword" label="Password">
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    value={inputs.password || ""}
                                    onChange={handleChange}
                                    name="password"
                                    style={{ paddingRight: '40px' }}
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="position-absolute end-0 top-50 translate-middle-y"
                                    style={{ cursor: 'pointer', zIndex: 1, marginRight: '30px' }}
                                    onClick={togglePasswordVisibility}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please insert a correct password.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    {loginError && <div className="text-danger mt-2">{loginError}</div>}
                </Form>
                <div className="d-flex flex-row mt-2">
                    <span className="me-2">Todavia no estas registrado?</span><Link to={"/signup"} onClick={onHide}>Regístrate</Link>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} variant="success">Log In</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}