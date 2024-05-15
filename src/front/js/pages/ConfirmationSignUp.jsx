import React, { useContext, useState } from "react";
import { Container, Row, Col, Alert, Button, Form, FloatingLabel, Nav } from 'react-bootstrap';
import { Context } from "../store/appContext";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export const ConfirmationSignUp = () => {
  const { actions } = useContext(Context)
  const { loginUser, setLogged } = actions
  const navigate = useNavigate()
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
      setValidated(true);
      const userType = activeTab === "users" ? "users" : "trainers";
      const validateLog = await loginUser(inputs, userType);
      if (!validateLog) {
        setLoginError('Los datos ingresados no son correctos. Por favor, inténtalo de nuevo.');
      } else {
        setLogged(true);
        setInputs({
          email: '',
          password: ''
        });
        setLoginError(null)
        setActiveTab("")
        navigate("/")
      }
    }
  };

  return (
    <Container className="py-4 d-flex justify-content-center align-items-center flex-column">
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <Alert variant="success">
            <Alert.Heading>¡Cuenta confirmada!</Alert.Heading>
            <p>Tu cuenta ha sido confirmada con éxito. Ahora puedes disfrutar de todos los beneficios de nuestro servicio.</p>
          </Alert>
        </Col>
      </Row>
      <Form className="my-2 p-3 w-auto border rounded" noValidate validated={validated} onSubmit={handleSubmit} style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
        <div className="text-center mb-3">
          <h4>Elige cómo deseas iniciar sesión:</h4>
        </div>
        <Nav defaultActiveKey={activeTab} variant="pills" justify className="d-flex flex-row justify-content-betweeen mb-3">
          <Nav.Item>
            <Nav.Link eventKey="users" onClick={() => handleTabChange("users")}>Usuario<FaCheckCircle className={`ms-2 ${activeTab === "users" ? "" : "d-none"}`} /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="trainers" onClick={() => handleTabChange("trainers")}>Entrenador<FaCheckCircle className={`ms-2 ${activeTab === "trainers" ? "" : "d-none"}`} /></Nav.Link>
          </Nav.Item>
        </Nav>
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
          <Form.Group as={Col} md="12" controlId="validationPassword">
            <FloatingLabel controlId="validationSignupPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                required
                value={inputs.password || ""}
                onChange={handleChange}
                name="password"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="position-absolute end-0 top-50 translate-middle-y"
                style={{ cursor: 'pointer', zIndex: 1, marginRight: '15px' }}
                onClick={togglePasswordVisibility}
              />
              <Form.Control.Feedback type="invalid">
                Please insert a correct password.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        {loginError && <div className="text-danger mt-2">{loginError}</div>}
        <div className="text-center mt-3">
          <Button onClick={handleSubmit} variant="success">Iniciar sesión</Button>
        </div>
      </Form>
    </Container>
  )
}