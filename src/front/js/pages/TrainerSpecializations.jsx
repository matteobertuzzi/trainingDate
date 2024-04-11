import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Context } from '../store/appContext';
import Loading from '/workspaces/sp54-final-project-g3/src/front/js/component/Loading.jsx';
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { AddTrainerSpecialization } from "/workspaces/sp54-final-project-g3/src/front/js/pages/AddTrainerSpecialization.jsx"
import { IoIosWarning } from "react-icons/io";

const TrainerSpecializations = () => {
    const { store, actions } = useContext(Context)
    const { currentUser } = store
    const [modalShow, setModalShow] = useState(false);


    if (!currentUser || !currentUser.specializations) {
        return <Loading />;
    }

    return (
        <Container className="mt-4">
            <Row className='m-3 d-flex flex-row gap-2'>
                <Link to={"/"}>
                    <RiArrowGoBackLine /> Volver atrás
                </Link>
            </Row>
            <h1 className="text-center mb-4">Mis Especializaciones</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {currentUser.specializations.length !== 0 ? (
                    currentUser.specializations.map((trainerSpec, index) => (
                        <Col key={index}>
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
                    <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center">
                        <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases disponibles</Alert.Heading>
                        <p>
                            Parece que aún no has creado ninguna clase. ¡No te preocupes! Puedes empezar ahora mismo creando tu primera clase.
                        </p>
                        <hr />
                        <Button as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`}>Crea una nueva clase!</Button>
                    </Alert>
                )}
            </Row>
        </Container>
    );
};

export default TrainerSpecializations;