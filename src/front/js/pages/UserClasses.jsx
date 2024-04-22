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
    const [merge, setMerge] = useState([])
    const { id } = useParams();

    if (!currentUser || !currentUser.user || !userClasses) {
        return <Loading />;
    }

    return (
        <Container className="min-vh-100 my-4">
            <Row className='m-3 d-flex flex-row gap-2 justify-content-between align-items-center'>
                <Col>
                    <Link to={"/"}>
                        <RiArrowGoBackLine /> Volver atrás
                    </Link>
                </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className="d-flex justify-content-center g-4">
                {userClasses && userClasses.length > 0 ? (
                    userClasses.map((classItem) => (
                        classItem.stripe_status === "Paid" ? (
                            <Col className="d-flex flex-column align-items-center justify-content-center gap-3" key={classItem.id}>
                                <Card border="primary" style={{ width: '18rem' }}>
                                    <Card.Header>{classItem.id}</Card.Header>
                                    <Card.Footer>
                                        <div className='d-flex flex-column gap-2'>
                                            <MapModal className='mx-3' addressData={[classItem.city, classItem.postal_code, classItem.street_name, classItem.street_number]} />
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Col>
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
                        )
                    ))
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
            </Row>
        </Container>
    )
}