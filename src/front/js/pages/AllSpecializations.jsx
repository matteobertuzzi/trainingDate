import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { SpecializationModal } from "../component/SpecializationModal.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export const AllSpecializations = () => {
    const { store, actions } = useContext(Context)
    const { specializations } = store
    const [showModal, setShowModal] = useState(false)

    return (
        <Container className="mb-3">
            <Row className="d-flex justify-content-center align-items-center">
                <Col className="d-flex justify-content-center align-items-center p-3 w-auto">
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: 'inset 0 0 15px rgba(255, 165, 0, 0.5)' }}>
                        <h4>Descubre todas las disciplinas disponibles!</h4>
                        <h6>Haz clic en el botón para ver más detalles</h6>
                    </div>
                </Col>
            </Row>
            <Row className="d-flex flex-row h-100 gap-2 align-items-center justify-content-center">
                {specializations.map((specialization) => (
                    <Col>
                        <Card key={specialization.id} className="h-100">
                            <Card.Img className="img-fluid" src={specialization.logo} style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} />
                            <Card.Body className="d-flex justify-content-center align-items-center">
                                <Button className="d-flex flex-row justify-content-center align-items-center gap-2" variant="info" onClick={() => setShowModal(true)}>
                                    {specialization.name.charAt(0).toUpperCase() + specialization.name.slice(1)}<FontAwesomeIcon icon={faCircleInfo} />
                                </Button>
                            </Card.Body>
                        </Card>
                        <SpecializationModal show={showModal} onHide={() => setShowModal(false)} specialization={specialization} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}