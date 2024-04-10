import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { useParams } from 'react-router-dom';

export const TrainerClasses = () => {
    const { store, actions } = useContext(Context)
    const { currentUser, trainerClasses } = store
    const { deleteClass } = actions
    const { id } = useParams();



    if (!currentUser || !currentUser.trainer) {
        return <Loading />;
    }

    return (
        <Container>
            {trainerClasses.map((classItem) => (
                <Row key={classItem.id}>
                    <Col className="d-flex flex-column align-items-center justify-content-center gap-3">
                        <Card border="primary" style={{ width: '18rem' }}>
                            <Card.Header>{classItem.id}</Card.Header>
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <section>
                                    <Card.Text>Ciudad: {classItem.city}</Card.Text>
                                    <Card.Text>Codigo Postal:{classItem.postal_code}</Card.Text>
                                    <Card.Text>Calle: {classItem.street_name}</Card.Text>
                                    <Card.Text>Precio: {classItem.price}</Card.Text>
                                </section>
                                <section className="d-flex flex-column gap-2">
                                    <Button variant="danger" onClick={() => deleteClass(classItem.trainer, classItem.id)}>Delete</Button>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}