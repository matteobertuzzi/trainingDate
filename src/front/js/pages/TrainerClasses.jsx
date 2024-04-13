import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { useParams, Link } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";


export const TrainerClasses = () => {
    const { store, actions } = useContext(Context)
    const { currentUser, trainerClasses } = store
    const { deleteTrainerClass } = actions
    const { id } = useParams();
    const [show, setShow] = useState(false);

    const handleClick = async (trainerId, classId) => {
        const deleteClass = await deleteTrainerClass(trainerId, classId)
        if (!deleteClass) {
            setShow(true)
        }
        setShow(false)
        useEffect(() => {
            actions.getTrainerClasses(currentUser.trainer.id);
        }, [trainerClasses])
    }


    if (!currentUser || !currentUser.trainer) {
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
                {trainerClasses.length !== 0 && (
                    <Col className='d-flex justify-content-end'>
                        <Button as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`} className='w-auto'>
                            Crea nueva clase
                        </Button>
                    </Col>
                )}
            </Row>
            <h1 className="text-center mb-4">Mis Classes</h1>
            <Row xs={1} md={2} lg={3} className="d-flex justify-content-center g-4">
                {trainerClasses.length !== 0 ? (
                    trainerClasses.map((classItem) => (
                        <Col className="d-flex flex-column align-items-center justify-content-center gap-3">
                            <Card key={classItem.id} border="primary" style={{ width: '18rem' }}>
                                <Card.Header>{classItem.id}</Card.Header>
                                <Card.Body className="d-flex justify-content-between align-items-center">
                                    <section>
                                        <Card.Text>Ciudad: {classItem.city}</Card.Text>
                                        <Card.Text>Codigo Postal:{classItem.postal_code}</Card.Text>
                                        <Card.Text>Calle: {classItem.street_name}</Card.Text>
                                        <Card.Text>Precio: {classItem.price / 100}</Card.Text>
                                    </section>
                                    <section className="d-flex flex-column gap-2">
                                        <Button variant="danger" onClick={() => handleClick(classItem.trainer, classItem.id)}>Delete</Button>
                                    </section>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-75">
                        <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases disponibles</Alert.Heading>
                        <p>
                            Parece que aún no has creado ninguna clase. ¡No te preocupes! Puedes empezar ahora mismo creando tu primera clase.
                        </p>
                        <Button as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`}>Crea una nueva clase!</Button>
                    </Alert>
                )}
            </Row>
            <Alert show={show} className="d-flex flex-column justify-content-center align-items-center" variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Error al cancelar la clase!</Alert.Heading>
                <p>No se puede cancelar la clase porque hay usuarios apuntados a ella.</p>
            </Alert>
        </Container>
    )
}