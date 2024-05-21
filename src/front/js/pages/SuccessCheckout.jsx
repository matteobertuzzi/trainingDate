import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom'


const SuccessCheckout = () => {
    const { store, actions } = useContext(Context)
    const { setActiveNavTab } = actions

    return (
        <Container className='min-vh-100 d-flex justify-content-center align-items-center flex-column'>
            <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                <Row>
                    <Col className="text-center d-flex justify-content-center align-items-center">
                        <FaCheckCircle style={{ fontSize: '5em', color: 'green' }} />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <h2 className="text-center">Pago exitoso</h2>
                        <p className="text-center">¡Gracias por tu compra! Tu pago ha sido procesado con éxito.</p>
                        <p className="text-center">Se ha enviado un correo electrónico de confirmación a tu dirección de correo electrónico registrada.</p>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <Button onClick={() => setActiveNavTab("home")} as={Link} to="/" variant="primary">Volver a la Home</Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default SuccessCheckout;