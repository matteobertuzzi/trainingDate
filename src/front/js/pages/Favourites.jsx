import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Row, Col, Alert, Button, Card } from 'react-bootstrap/';
import Loading from '../component/Loading.jsx';
import { IoIosWarning } from "react-icons/io";

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
            <h1>Lista de favoritos</h1>
            <Row className="d-flex justify-content-center align-items-center">
                {allClasses && allClasses.length > 0 && favourites.length > 0 ? (
                    allClasses.map((oneClass) => (
                        <Col key={oneClass.class_details.id} className="d-flex flex-row align-items-center justify-content-center mb-1" xl={2} lg={3} md={5} sm={8} xs={10}>
                            {favourites.includes(oneClass.class_details.id) ? (
                                <Card>
                                    <Card.Header>
                                        <span>{oneClass.class_details.id}</span>
                                    </Card.Header>
                                    <Card.Body className="d-flex flex-column justify-content-between align-items-start">
                                        <Card.Text>
                                            <strong>Ciudad: </strong>{oneClass.class_details.city}
                                        </Card.Text>
                                        <Card.Text >
                                            <strong>Precio: </strong>{oneClass.class_details.price / 100}<span> €</span>
                                        </Card.Text>
                                        <Card.Text >
                                            <strong>Inicio: </strong> {new Date(oneClass.class_details.start_date).toLocaleDateString()}
                                        </Card.Text>
                                        <Card.Text className="d-none d-md-block">
                                            <strong>Capacidad: </strong>{oneClass.class_details.capacity}<span> personas</span>
                                        </Card.Text>
                                        <Card.Text >
                                            <strong>Nivel entrenamiento: </strong>
                                            {oneClass.class_details.training_level === "Advanced" ? <span className="bg-danger p-1 rounded text-white">Avanzado</span> :
                                                oneClass.class_details.training_level === "Intermediate" ? <span className="bg-warning p-1 rounded text-white">Intermedio</span> :
                                                    oneClass.class_details.training_level === "Beginner" ? <span className="bg-success p-1 rounded text-white">Principiante</span> :
                                                        ""}
                                        </Card.Text>
                                        <Card.Text >
                                            <strong>Tipo entrenamiento: </strong>{oneClass.specialization.name}
                                        </Card.Text>
                                        {oneClass.class_details.additional_info && (
                                            <Card.Text>
                                                <strong>Información adicional: </strong>{oneClass.class_details.additional_info}
                                            </Card.Text>
                                        )}

                                    </Card.Body>
                                    <Card.Footer>
                                        <Button onClick={() => handleCheckout(oneClass.class_details.stripe_product_id, currentUser.user.stripe_customer_id, oneClass.class_details.id)}>Checkout</Button>
                                        <Button onClick={async () => await deleteUserClass(currentUser.user.id, oneClass.class_details.id)} variant="danger">
                                            <span>Quitar de favoritos</span>
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            ) : null}
                        </Col>
                    ))
                ) : (
                    <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-auto">
                        <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases favoritas!</Alert.Heading>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p>
                                Parece que aún no has seleccionado ninguna clase favorita.
                            </p>
                            <p>¡No te preocupes! Selecciona ahora tu clases favoritas!</p>
                            <Button as={Link} variant="primary" to={"/allClasses"}>Ver clases disponibles</Button>
                        </div>
                    </Alert>
                )}
            </Row>
        </Container >
    )
}