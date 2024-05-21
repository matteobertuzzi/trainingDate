import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap/';
import SignupTrainer from '../component/SignupTrainer.jsx';
import SignupUser from '../component/SignupUser.jsx';


const Signup = () => {
    const [activeTab, setActiveTab] = useState("users");

    const handleTabChange = (selectedKey) => {
        setActiveTab(selectedKey);
    };

    return (
        <Container className="min-vh-100 my-4">
            <Row className="d-flex justify-content-center align-items-center mb-3">
                <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column p-3 w-auto">
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h4 className="text-center mb-2">¡Regístrate!</h4>
                        <h5 className="text-center">Elige cómo quieres registrarte: ¡ya sea como entrenador o como usuario!</h5>
                    </div>
                </Col>
            </Row>
            <Nav className="d-flex flex-row justify-content-center align-items-center mt-2" variant="tabs" activeKey={activeTab} onSelect={handleTabChange}>
                <Nav.Item>
                    <Nav.Link className={`${activeTab === "users" ? "bg-primary text-white " : ""}`} eventKey="users">
                        <span>Usuario</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`${activeTab === "trainers" ? "bg-primary text-white " : ""}`} eventKey="trainers">
                        <span>Entrenador</span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            {activeTab === "users" && (
                <SignupUser />
            )}
            {activeTab === "trainers" && (
                <SignupTrainer />
            )}
        </Container>
    )
}

export default Signup;