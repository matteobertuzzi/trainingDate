import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { Context } from '../store/appContext';
import Loading from '/workspaces/sp54-final-project-g3/src/front/js/component/Loading';
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { AddTrainerSpecialization } from "/workspaces/sp54-final-project-g3/src/front/js/pages/AddTrainerSpecialization"
import { IoIosWarning } from "react-icons/io";


const TrainerSpecializations = () => {
    const { store, actions } = useContext(Context)
    const { currentUser } = store
    const [modalShow, setModalShow] = useState(false);

    if (!currentUser || !currentUser.specializations) {
        return <Loading />;
    }

    return (
        <Container className="min-vh-100 mt-4">
            <Row className='m-3 d-flex flex-row gap-2 justify-content-between align-items-center'>
                <Col>
                    <Link to={"/"}>
                        <RiArrowGoBackLine /> Volver atrás
                    </Link>
                </Col>
                {currentUser.specializations.length !== 0 && (
                    <Col className='d-flex justify-content-end'>
                        <Button onClick={() => setModalShow(true)} className='w-auto'>
                            Crea nueva especialización
                        </Button>
                    </Col>
                )}
                <AddTrainerSpecialization show={modalShow} onHide={() => setModalShow(false)} />
            </Row>
            <h1 className="text-center mb-4">Mis Especializaciones</h1>
            <Row xs={1} md={2} lg={3} className="d-flex justify-content-center g-4">
                {currentUser.specializations.length !== 0 ? (
                    currentUser.specializations.map((trainerSpec) => (
                        <Col key={trainerSpec.specialization.id}>
                            <Card className="h-100">
                                <Card.Img variant="top" src="https://ncan.us/wp-content/uploads/2020/04/personal-trainer-1024x653.jpg" />
                                <Card.Body>
                                    <Card.Title>{trainerSpec.specialization.name}</Card.Title>
                                    <Card.Text>{trainerSpec.specialization.description}</Card.Text>
                                </Card.Body>
                            </Card>
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
                        <Button onClick={() => setModalShow(true)} className="mt-3">
                            Crea una nueva especialización
                        </Button>
                    </Alert>
                )}
            </Row>
        </Container>
    );
};

export default TrainerSpecializations;