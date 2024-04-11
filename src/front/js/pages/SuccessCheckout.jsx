import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../store/appContext';

const SuccessCheckout = () => {
    const { store, actions } = useContext(Context)
    const { getUserClasses } = actions
    const navigate = useNavigate()

    const handleClick = async () => {
        await getUserClasses()
        navigate("/")
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col className="text-center">
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
                    <Button onClick={handleClick} variant="primary">Volver a la Home</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default SuccessCheckout;