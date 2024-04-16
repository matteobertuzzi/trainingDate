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


    useEffect(() => {
        mergeClasses();
    }, []);

    const mergeClasses = () => {
        const merged = [];

        for (let i = 0; i < userClasses.length; i++) {
            const userClass = userClasses[i];
            const foundClass = allClasses.find(classItem => classItem.id === userClass.class);
            if (foundClass) {
                const mergedClass = { ...foundClass, ...userClass };
                merged.push(mergedClass);
                setMerge(merged)
                console.log(merged)
            }
        }
    };

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
                {merge.length !== 0 ? (
                    merge.map((classItem) => (
                        classItem.stripe_status === "Paid" ? (
                            <Col className="d-flex flex-column align-items-center justify-content-center gap-3" key={classItem.id}>
                                <Card key={classItem.id} border="primary" style={{ width: '18rem' }}>
                                    <Card.Header>{classItem.class_name}</Card.Header>
                                    <Card.Body className="d-flex justify-content-between align-items-center">
                                        <section>
                                            <Card.Text><strong>Ciudad:</strong> {classItem.city}</Card.Text>
                                            <Card.Text><strong>Código Postal:</strong> {classItem.postal_code}</Card.Text>
                                            <Card.Text><strong>Calle:</strong> {classItem.street_name}</Card.Text>
                                            <Card.Text><strong>Precio:</strong> {classItem.price / 100}<span>€</span></Card.Text>
                                            <Card.Text><strong>Capacidad:</strong> {classItem.capacity}</Card.Text>
                                            <Card.Text><strong>Nivel de entrenamiento:</strong> {classItem.training_level === 'Beginner' ? 'Principiante' :
                                                classItem.training_level === 'Intermediate' ? 'Intermedio' : classItem.training_level}</Card.Text>
                                        </section>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div className='d-flex flex-column gap-2'>
                                            <ClassModal userClass={classItem} />
                                            <MapModal className='mx-3' addressData={[classItem.city, classItem.postal_code, classItem.street_name, classItem.street_number]} />
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ) : ""
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