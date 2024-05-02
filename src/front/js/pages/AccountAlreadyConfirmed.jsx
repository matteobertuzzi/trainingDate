import React, { useContext} from 'react';
import { Context } from '../store/appContext';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const AccountAlreadyConfirmedPage = () => {
    const { store, actions } = useContext(Context)
    const { setActiveNavTab } = actions

    return (
        <Container className="my-4 min-vh-100 d-flex justify-content-center align-items-center flex-column">
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <Alert variant="info">
                        <Alert.Heading>Cuenta ya confirmada</Alert.Heading>
                        <p>Esta cuenta ya ha sido confirmada anteriormente. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
                        <Button onClick={() => setActiveNavTab("home")} as={Link} to="/">Ir a la Homepage</Button>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountAlreadyConfirmedPage;