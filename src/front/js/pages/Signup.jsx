import React from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap/';
import SignupTrainer from '../component/SignupTrainer.jsx';
import SignupUser from '../component/SignupUser.jsx';


const Signup = () => {

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
            <Tabs
                defaultActiveKey="users"
                id="signup"
                className="mb-3"
                fill
            >
                <Tab eventKey="users" title="Users">
                    <SignupUser />
                </Tab>
                <Tab eventKey="trainers" title="Trainers">
                    <SignupTrainer />
                </Tab>
            </Tabs>
        </Container>
    )
}

export default Signup;