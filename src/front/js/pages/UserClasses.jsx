import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Image, Button, Alert } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { useParams, Link } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import MapModal from "../component/MapModal.jsx";
import ClassModal from "../component/ClassModal.jsx";

export const UserClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, userClasses, allClasses } = store;
    const { id } = useParams();

    if (!currentUser || !currentUser.user || !userClasses) {
        return <Loading />;
    }

    return (
        <Container className="min-vh-100 my-4 d-flex flex-column gap-2">
            <Row className='m-3 d-flex flex-row gap-2 justify-content-between align-items-center'>
                <Col>
                    <Link to={"/"}>
                        <RiArrowGoBackLine /> Volver atrás
                    </Link>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
                <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column border rounded justify-content-center align-items-center p-3">
                    <h5>El Camino hacia una Vida Más Saludable</h5>
                    <h6>Descubre tus clases confirmadas!</h6>
                </Col>
            </Row>
            {userClasses.length > 0 ? (
                <Row xs={1} md={2} lg={3} className="d-flex justify-content-center mt-3 g-4">
                    {userClasses.map((classItem) => (
                        classItem.user_class.stripe_status === "Paid" ? (
                            <Col className="d-flex flex-column align-items-center justify-content-center gap-2" key={classItem.user_class.id}>
                                <Card border="primary" style={{ width: '18rem' }}>
                                    <Card.Img className="img-fluid w-100" variant="top" src={classItem.trainer_class.specialization.logo} />
                                    <Card.ImgOverlay style={{ position: 'absolute', top: 0, right: 0, bottom: '55%', filter: 'brightness(90%)' }}>
                                        {classItem.trainer_class.specialization.name}
                                    </Card.ImgOverlay>
                                    <Card.Body className="d-flex flex-column align-items-start justify-content-center gap-1">
                                        <Card.Text className="m-0 p-0">
                                            <strong>Ciudad: </strong>{classItem.trainer_class.class_details.city}
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Precio: </strong>{classItem.trainer_class.class_details.price / 100}<span> €</span>
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Inicio: </strong> {new Date(classItem.trainer_class.class_details.start_date).toLocaleDateString()}
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Capacidad: </strong>{classItem.trainer_class.class_details.capacity}<span> personas</span>
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Difficultad: </strong>
                                            {classItem.trainer_class.class_details.training_level === "Advanced" ? <span className="bg-danger p-1 rounded text-white">Avanzado</span> :
                                                classItem.trainer_class.class_details.training_level === "Intermediate" ? <span className="bg-warning p-1 rounded text-white">Intermedio</span> :
                                                    classItem.trainer_class.class_details.training_level === "Beginner" ? <span className="bg-success p-1 rounded text-white">Principiante</span> :
                                                        ""}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div className='d-flex flex-row gap-2 justify-content-evenly align-items-center'>
                                            <ClassModal userClass={classItem.trainer_class} />
                                            <MapModal className='mx-3' addressData={[classItem.trainer_class.class_details.city, classItem.trainer_class.class_details.postal_code, classItem.trainer_class.class_details.street_name, classItem.trainer_class.class_details.street_number]} />
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ) : null
                    ))}
                </Row>
            ) : (
                <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-auto">
                    <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases reservadas!</Alert.Heading>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p>
                            Parece que aún no has reservado ninguna clase.
                        </p>
                        <p>¡No te preocupes! Puedes empezar ahora mismo reservando tu primera clase.</p>
                        <Button as={Link} variant="primary" to={"/allClasses"}>Ver clases disponibles</Button>
                    </div>
                </Alert>
            )}
        </Container>
    )

}