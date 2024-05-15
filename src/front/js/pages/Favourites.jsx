import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Row, Col, Alert, Button, Card } from 'react-bootstrap/';
import Loading from '../component/Loading.jsx';
import { IoIosWarning } from "react-icons/io";
import ClassModal from '../component/ClassModal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleMinus, faCreditCard } from '@fortawesome/free-solid-svg-icons';

export const Favourites = () => {
    const { id } = useParams()
    const { store, actions } = useContext(Context)
    const { userClasses, currentUser, favourites } = store
    const { createCheckoutSession, deleteUserClass, setActiveNavTab } = actions

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
        <Container className="min-vh-100 my-2">
            <Row className="d-flex justify-content-center align-items-center">
                <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column p-3 w-auto">
                <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h4>Lista de favoritos</h4>
                    </div>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-3 g-4">
                {(userClasses && userClasses.some(oneClass => oneClass.user_class.stripe_status !== 'Paid')) ? (
                    userClasses.map((oneClass) => (
                        oneClass.user_class.stripe_status !== "Paid" ? (
                            <Col key={oneClass.trainer_class.class_details.id} className="d-flex flex-row align-items-center justify-content-center mb-1" xl={3} lg={4} md={6} sm={8} xs={10}>
                                <Card className="d-flex flex-column">
                                    <div className="position-relative">
                                        <Card.Img className="img-fluid w-100 position-relative" variant="top" src={oneClass.trainer_class.specialization.logo} />
                                        <Card.ImgOverlay style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}>
                                            <span className="text-white">{oneClass.trainer_class.specialization.name.charAt(0).toUpperCase() + oneClass.trainer_class.specialization.name.slice(1)}</span>
                                        </Card.ImgOverlay>
                                    </div>
                                    <Card.Body className="d-flex flex-column align-items-start justify-content-center gap-1">
                                        <Card.Text className="m-0 p-0">
                                            <strong>Ciudad: </strong>{oneClass.trainer_class.class_details.city}
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Precio: </strong>{oneClass.trainer_class.class_details.price / 100}<span> €</span>
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Inicio: </strong> {new Date(oneClass.trainer_class.class_details.start_date).toLocaleDateString()}
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Capacidad: </strong>{oneClass.trainer_class.class_details.capacity}<span> personas</span>
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Difficultad: </strong>
                                            {oneClass.trainer_class.class_details.training_level === "Advanced" ? <span className="text-danger p-1">Avanzado</span> :
                                                oneClass.trainer_class.class_details.training_level === "Intermediate" ? <span className="text-warning p-1">Intermedio</span> :
                                                    oneClass.trainer_class.class_details.training_level === "Beginner" ? <span className="text-success p-1">Principiante</span> :
                                                        ""}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="d-flex w-100 flex-row align-items-center justify-content-evenly gap-1 p-3">
                                        <ClassModal userClass={oneClass.trainer_class} />
                                        <Button variant="btn btn-outline-success" className="d-flex align-items-center justify-content-center gap-1" onClick={() => handleCheckout(oneClass.trainer_class.class_details.stripe_product_id, currentUser.user.stripe_customer_id, oneClass.trainer_class.class_details.id)}>
                                            <span>Checkout</span><FontAwesomeIcon icon={faCreditCard} />
                                        </Button>
                                        <Button onClick={async () => await deleteUserClass(currentUser.user.id, oneClass.trainer_class.class_details.id)} variant="btn btn-outline-danger">
                                            <FontAwesomeIcon size="2x" icon={faHeartCircleMinus} />
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ) : null
                    ))
                ) : (
                    <Col className="d-flex justify-content-center align-items-center m-4 w-auto">
                        <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center">
                            <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases favoritas!</Alert.Heading>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <p>Parece que aún no has seleccionado ninguna clase favorita.</p>
                                <p>¡No te preocupes! Selecciona ahora tus clases favoritas!</p>
                                <Button as={Link} onClick={() => setActiveNavTab("allClasses")} variant="primary" to={"/allClasses"}>Ver clases disponibles</Button>
                            </div>
                        </Alert>
                    </Col>
                )}
            </Row>
        </Container>

    )
}