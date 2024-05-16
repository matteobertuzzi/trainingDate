import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';
import Loading from '/workspaces/sp54-final-project-g3/src/front/js/component/Loading.jsx';
import { Link } from 'react-router-dom'
import { AddTrainerSpecialization } from "/workspaces/sp54-final-project-g3/src/front/js/pages/AddTrainerSpecialization.jsx"
import { IoIosWarning } from "react-icons/io";
import { SpecializationModal } from "../component/SpecializationModal.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


const TrainerSpecializations = () => {
    const { store, actions } = useContext(Context)
    const { currentUser } = store
    const { setActiveNavTab } = actions
    const [modalShow, setModalShow] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [spec, setSpec] = useState();

    if (!currentUser || !currentUser.specializations) {
        return <Loading />;
    }

    return (
        <Container className="mt-4 mb-5">
            <Row className="d-flex justify-content-center align-items-center">
                <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column p-3 w-auto">
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h4 className="text-center mb-2">Mis Especializaciones</h4>
                        <h5 className="text-center">Aquí puedes encontrar tus especializaciones confirmadas.</h5>
                        <div className='d-flex flex-column flex-sm-row gap-2 mt-2'>
                            <Button variant="success" onClick={() => setModalShow(true)} className='w-auto'>
                                Crea nueva especialización
                            </Button>
                            <Button onClick={() => setActiveNavTab("")} as={Link} to={"/allSpecializations"}>Ver disciplinas disponibles</Button>
                        </div>
                    </div>
                    <AddTrainerSpecialization show={modalShow} onHide={() => setModalShow(false)} />
                </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className="d-flex justify-content-center g-4 mt-2">
                {currentUser.specializations.length !== 0 ? (
                    currentUser.specializations.map((trainerSpec) => (
                        <Col key={trainerSpec.specialization.id}>
                            <Card className="h-100">
                                <div className="position-relative">
                                    <Card.Img className="img-fluid" rounded src={trainerSpec.specialization.logo} />
                                    <Card.ImgOverlay rounded style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}>
                                        <Button className='btn-lg d-flex flex-row justify-content-center align-items-center gap-2' variant="info" onClick={() => { setShowModal(true); setSpec(trainerSpec.specialization); }}><span className="text-white"> {trainerSpec.specialization.name.charAt(0).toUpperCase() + trainerSpec.specialization.name.slice(1)}</span><FontAwesomeIcon icon={faCircleInfo}/></Button>
                                    </Card.ImgOverlay>
                                </div>
                            </Card>
                            <SpecializationModal show={showModal} onHide={() => setShowModal(false)} specialization={spec ? spec : trainerSpec.specialization} />
                        </Col>
                    ))
                ) : (
                    <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-75">
                        <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2">
                            <IoIosWarning /> No hay especializaciones disponibles
                        </Alert.Heading>
                        <p className="text-center">
                            Parece que aún no has creado ninguna especialización. ¡No te preocupes! Puedes empezar ahora mismo creando tu primera. Envía tu certificado para que sea aprobado por los administradores. Recibirás un correo para informarte del resultado de la revisión.
                        </p>
                    </Alert>
                )}
            </Row>
        </Container>
    );
};

export default TrainerSpecializations;