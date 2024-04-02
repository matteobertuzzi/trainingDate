import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../store/appContext.js";

export const Cart = () => {
    const { store, actions } = useContext(Context)
    const { postCheckoutSession } = actions

    const id = 123; //pasar el id de la clase
    const url = 'http://localhost:3001/success';


    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            Class Name
                        </Card.Header>
                        <Card.Body className="d-flex justify-content-between">
                            <p>Description class</p><p>Price</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end mt-2">
                    <Button onClick={() => postCheckoutSession(id, url)}>Checkout</Button>
                </Col>
            </Row>
        </Container>
    );
};