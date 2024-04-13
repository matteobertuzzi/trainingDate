import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const AccountAlreadyConfirmedPage = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <Alert variant="info">
                        <Alert.Heading>Cuenta ya confirmada</Alert.Heading>
                        <p>Esta cuenta ya ha sido confirmada anteriormente. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountAlreadyConfirmedPage;