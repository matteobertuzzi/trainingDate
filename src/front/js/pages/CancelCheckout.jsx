import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../store/appContext';


const CancelCheckout = () => {
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
                    <FaTimesCircle style={{ fontSize: '5em', color: 'red' }} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h2 className="text-center">Pago cancelado</h2>
                    <p className="text-center">Lo sentimos, tu pago no se ha procesado. Por favor, inténtalo de nuevo más tarde.</p>
                    <p className="text-center">Si el problema persiste, no dudes en contactar con nuestro equipo de soporte.</p>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-center">
                    <Button onClick={handleClick} variant="primary">Volver a la tienda</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CancelCheckout;