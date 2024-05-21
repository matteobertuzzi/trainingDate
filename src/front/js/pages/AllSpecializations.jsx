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
    const [spec, setSpec] = useState();

    return (
        <Container className="mt-4 mb-5">
            <Row className="d-flex justify-content-center align-items-center">
                <Col className="d-flex justify-content-center align-items-center p-3 w-auto">
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h3>Descubre todas las disciplinas disponibles!</h3>
                        <p className='m-0'>Haz clic en el botón para ver más detalles</p>
                    </div>
                </Col>
            </Row>
            <Row className="d-flex flex-row justify-content-center gap-2 mt-3">
                {specializations.map((specialization) => (
                    <Col rounded key={specialization.id} xs={10} sm={6} md={4} lg={3} className="mb-3">
                        <Card className="h-100">
                            <div className="position-relative">
                                <Card.Img rounded className="img-fluid" src={specialization.logo} style={{ height: '200px', objectFit: 'cover'}} />
                                <Card.ImgOverlay rounded style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}>
                                    <Button className='btn-lg d-flex flex-row justify-content-center align-items-center gap-2' variant="info" onClick={() => { setShowModal(true); setSpec(specialization); }}><span className="text-white"> {specialization.name.charAt(0).toUpperCase() + specialization.name.slice(1)}</span><FontAwesomeIcon icon={faCircleInfo} /></Button>
                                    <SpecializationModal show={showModal} onHide={() => setShowModal(false)} specialization={spec ? spec : specialization} />
                                </Card.ImgOverlay>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}