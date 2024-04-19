import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ListGroup, Container, Row, Col, Alert, Button } from 'react-bootstrap/';
import Loading from '../component/Loading.jsx';

export const Favourites = () => {
    const { id } = useParams()
    const { store, actions } = useContext(Context)
    const { userClasses, currentUser, allClasses, favourites } = store
    const { createCheckoutSession, deleteUserClass } = actions

    if (!currentUser || !currentUser.user || !userClasses) {
        return <Loading />;
    }

    const handleCheckout = async (stripeProductId, stripeCustomerId, classId) => {
        const checkout = await createCheckoutSession(stripeProductId, stripeCustomerId)
        if (checkout) {
            const updatedFavourites = favourites.filter(id => id !== classId);
            localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
            setStore({ favourites: updatedFavourites });
        }
    }

    return (
        <Container className="min-vh-100">
            <Row>
                <Col>
                    <ListGroup>
                        {allClasses && allClasses.length > 0 ? (
                            allClasses.map((oneClass) => (
                                <React.Fragment key={oneClass.id}>
                                    {favourites && favourites.includes(oneClass.id) ? (
                                        <ListGroup.Item className="d-flex flex-row justify-content-between align-items-center">
                                            <span>{oneClass.id}</span>
                                            <Button onClick={() => handleCheckout(oneClass.stripe_product_id, currentUser.user.stripe_customer_id, oneClass.id)}>Checkout</Button>
                                            <Button onClick={async () => await deleteUserClass(currentUser.user.id, oneClass.id)} variant="danger">
                                                <span>Quitar de favoritos</span>
                                            </Button>
                                        </ListGroup.Item>
                                    ) : null}
                                </React.Fragment>
                            ))
                        ) : (
                            <Alert>No hay clases disponibles!</Alert>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}