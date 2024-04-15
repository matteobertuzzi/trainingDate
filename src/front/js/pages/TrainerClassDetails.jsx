import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { RiArrowGoBackLine } from "react-icons/ri";

export const TrainerClassDetails = () => {
    const { store, actions } = useContext(Context)
    const { currentUser, userInTrainerClass } = store
    const { trainerId, classId } = useParams()

    useEffect(() => {
        actions.getTrainerClassDetails(classId);
    }, []);


    if (!userInTrainerClass || !currentUser || !currentUser.trainer) {
        return <Loading />;
    }

    return (
        <Container className="my-5">
            <Row className='m-3 d-flex flex-row gap-2 justify-content-between align-items-center'>
                <Col>
                    <Link to={`/trainer/${currentUser.trainer.id}/classes`}>
                        <RiArrowGoBackLine /> Volver atrás
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center align-items-center">
                    <h1>Detalles de la Clase</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {userInTrainerClass.class && (
                                <>
                                    <Card.Text>Ciudad: {userInTrainerClass.class.city}</Card.Text>
                                    <Card.Text>Codigo Postal: {userInTrainerClass.class.postal_code}</Card.Text>
                                    <Card.Text>Calle: {userInTrainerClass.class.street_name}</Card.Text>
                                    <Card.Text>Numero: {userInTrainerClass.class.street_number}</Card.Text>
                                    <Card.Text>Informacion adicional: {userInTrainerClass.class.additional_info}</Card.Text>
                                    <Card.Text>Fecha inicio: {userInTrainerClass.class.start_date}</Card.Text>
                                    <Card.Text>Fecha fin: {userInTrainerClass.class.end_date}</Card.Text>
                                    <Card.Text>Capacidad: {userInTrainerClass.class.capacity} personas</Card.Text>
                                    <Card.Text>Precio: {userInTrainerClass.class.price / 100} €</Card.Text>
                                    <Card.Text>Nombre clase: {userInTrainerClass.class.class_name}</Card.Text>
                                    <Card.Text>Detalles clase: {userInTrainerClass.class.class_details}</Card.Text>
                                    <Card.Text>
                                        Nivel entrenamiento: {
                                            userInTrainerClass.class.training_level === "Advanced" ? "Avanzado" :
                                                userInTrainerClass.class.training_level === "Intermediate" ? "Intermedio" :
                                                    userInTrainerClass.class.training_level === "Beginner" ? "Principiante" :
                                                        userInTrainerClass.class.training_level
                                        }
                                    </Card.Text>
                                    {userInTrainerClass.specialization && (
                                        <div>
                                            <Card.Text>{userInTrainerClass.specialization.name}</Card.Text>
                                            <Card.Text>{userInTrainerClass.specialization.description}</Card.Text>
                                        </div>
                                    )}
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Usuarios inscriptos: {userInTrainerClass.user_in_class ? userInTrainerClass.user_in_class.length : ""}</Card.Header>
                        <Card.Body>
                            {userInTrainerClass.user_in_class && (
                                userInTrainerClass.user_in_class.map((user) => {
                                    return <Card.Text>{user.name}</Card.Text>;
                                })
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};