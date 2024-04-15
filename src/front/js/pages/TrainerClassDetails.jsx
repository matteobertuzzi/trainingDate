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
        <Container className="my-4">
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
            <Row className="d-flex flex-row justify-content-center align-items-center gap-2">
                <Col>
                    <Card>
                        <Card.Body>
                            {userInTrainerClass && (
                                <>
                                    {userInTrainerClass.class && (
                                        <>
                                            <Card.Text><strong>Ciudad:</strong> {userInTrainerClass.class.city}</Card.Text>
                                            <Card.Text><strong>Codigo Postal:</strong> {userInTrainerClass.class.postal_code}</Card.Text>
                                            <Card.Text><strong>Calle:</strong> {userInTrainerClass.class.street_name}</Card.Text>
                                            <Card.Text><strong>Numero:</strong> {userInTrainerClass.class.street_number}</Card.Text>
                                            <Card.Text><strong>Informacion adicional:</strong> {userInTrainerClass.class.additional_info}</Card.Text>
                                            <Card.Text><strong>Fecha inicio:</strong> {userInTrainerClass.class.start_date}</Card.Text>
                                            <Card.Text><strong>Fecha fin:</strong> {userInTrainerClass.class.end_date}</Card.Text>
                                            <Card.Text><strong>Capacidad:</strong> {userInTrainerClass.class.capacity} personas</Card.Text>
                                            <Card.Text><strong>Precio:</strong> {userInTrainerClass.class.price / 100} €</Card.Text>
                                            <Card.Text><strong>Nombre clase:</strong> {userInTrainerClass.class.class_name}</Card.Text>
                                            <Card.Text><strong>Detalles clase:</strong> {userInTrainerClass.class.class_details}</Card.Text>
                                            <Card.Text>
                                                <strong>Nivel entrenamiento:</strong>{" "}
                                                {userInTrainerClass.class.training_level === "Advanced"
                                                    ? "Avanzado"
                                                    : userInTrainerClass.class.training_level === "Intermediate"
                                                        ? "Intermedio"
                                                        : userInTrainerClass.class.training_level === "Beginner"
                                                            ? "Principiante"
                                                            : userInTrainerClass.class.training_level}
                                            </Card.Text>
                                        </>
                                    )}
                                    {userInTrainerClass.specialization && (
                                        <div>
                                            <Card.Text><strong>Especialización: </strong>{userInTrainerClass.specialization.name}</Card.Text>
                                            <Card.Text><strong>Descripción especialización: </strong>{userInTrainerClass.specialization.description}</Card.Text>
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
                            {userInTrainerClass.user_in_class && userInTrainerClass.user_in_class.length > 0 ? (
                                userInTrainerClass.user_in_class.map((user) => {
                                    return <Card.Text key={user.id}>{user.name}</Card.Text>;
                                })
                            ) : (
                                <Card.Text>No hay usuarios apuntados</Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};