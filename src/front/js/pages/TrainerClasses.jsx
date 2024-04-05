import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { useParams } from 'react-router-dom';

export const TrainerClasses = () => {
    const { store, actions } = useContext(Context)
    const { currentUser, trainerClasses } = store
    const { createCheckoutSession, deleteStripeProduct } = actions
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
                                </section>
                                <section className="d-flex flex-column gap-2">
                                    <Button variant="primary" onClick={() => createCheckoutSession(classItem.stripe_id)}>Checkout</Button>
                                    <Button variant="danger" onClick={() => deleteStripeProduct(classItem.stripe_id)}>Delete</Button>
                                </section>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}