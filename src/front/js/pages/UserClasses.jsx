import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Image, Button, Alert } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { useParams, Link } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";

export const UserClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, userClasses } = store;
    const { id } = useParams();


    if (!currentUser || !currentUser.user) {
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
                {userClasses.length !== 0 ? (
                    userClasses.map((classItem) => (
                        classItem.stripe_status === "Paid" ? (
                            <Col className="d-flex flex-column align-items-center justify-content-center gap-3" key={classItem.id}>
                                <Card key={classItem.id} border="primary" style={{ width: '18rem' }}>
                                    <Card.Header>{classItem.id}</Card.Header>
                                    <Card.Body className="d-flex justify-content-between align-items-center">
                                        <section>
                                            <Card.Text>Ciudad: {classItem.city}</Card.Text>
                                            <Card.Text>Codigo Postal:{classItem.postal_code}</Card.Text>
                                            <Card.Text>Calle: {classItem.street_name}</Card.Text>
                                        </section>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ) : ""
                    ))
                ) : (
                    <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-auto">
                        <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases disponibles</Alert.Heading>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p>
                                Parece que aún no has reservado ninguna clase.
                            </p>
                            <p>¡No te preocupes! Puedes empezar ahora mismo reservando tu primera clase.</p>
                            <Button as={Link} variant="primary" to={"/"}>Ver clases disponibles</Button>
                        </div>
                    </Alert>
                )}
            </Row>
        </Container>
    )
}