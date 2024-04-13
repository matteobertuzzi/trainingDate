import React, { useContext, useState } from "react";
import { Container, Row, Col, Alert, Button, Form, FloatingLabel, Nav } from 'react-bootstrap';
import { Context } from "../store/appContext";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export const ConfirmationSignUp = () => {
  const { actions } = useContext(Context)
  const { loginUser, setLogged } = actions
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [activeTab, setActiveTab] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

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
    <Container className="mt-4 d-flex justify-content-center align-items-center flex-column">
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <Alert variant="success">
            <Alert.Heading>¡Cuenta confirmada!</Alert.Heading>
            <p>Tu cuenta ha sido confirmada con éxito. Ahora puedes disfrutar de todos los beneficios de nuestro servicio.</p>
          </Alert>
        </Col>
      </Row>
      <Form className="mb-2" noValidate validated={validated} onSubmit={handleSubmit} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
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
              <Form.Control.Feedback type="invalid">
                Please insert a correct password.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        {loginError && <div className="text-danger mt-2">{loginError}</div>}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Button onClick={handleSubmit} variant="success" style={{ borderRadius: '20px', padding: '10px 20px' }}>Log In</Button>
        </div>
      </Form>
    </Container>
  )
}