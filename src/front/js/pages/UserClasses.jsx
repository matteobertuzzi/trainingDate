import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { useParams } from 'react-router-dom';

export const UserClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser } = store;
    const userClasses = store.userClasses.trainer_classes;
    const { id } = useParams();



    if (!currentUser || !currentUser.user) {
        return <Loading />;
    }

    return (
        <Container>
            {userClasses.map((classItem) => (
                <Row key={classItem.id}>
                    <Col className="d-flex flex-column align-items-center justify-content-center gap-3">
                        <Card border="primary" style={{ width: '18rem' }}>
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
                </Row>
            ))}
        </Container>
    )
}