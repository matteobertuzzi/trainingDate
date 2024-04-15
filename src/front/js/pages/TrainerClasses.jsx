import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Button, Alert, Nav, Pagination } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";

export const TrainerClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, trainerClasses } = store;
    const { deleteTrainerClass } = actions;
    const { id } = useParams();
    const navigate = useNavigate()
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [pastClasses, setPastClasses] = useState([]);
    const [futureClasses, setFutureClasses] = useState([]);
    const [activeTab, setActiveTab] = useState("past");
    const [activePage, setActivePage] = useState(1);
    const classesPerPage = 4;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const past = [];
        const future = [];
        trainerClasses.forEach(classItem => {
            const classStartTime = new Date(classItem.start_date);
            if (classStartTime <= currentDateTime) {
                past.push(classItem);
            } else {
                future.push(classItem);
            }
        });
        setPastClasses(past);
        setFutureClasses(future);
    }, [trainerClasses, currentDateTime]);

    const handleClick = async (trainerId, classId) => {
        await deleteTrainerClass(trainerId, classId);
    }

    const handleDetails = async (classId) => {
        await actions.getTrainerClassDetails(classId)
    }

    const paginate = (pageNumber) => setActivePage(pageNumber);

    const indexOfLastClass = activePage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses = activeTab === "past" ? pastClasses.slice(indexOfFirstClass, indexOfLastClass) : futureClasses.slice(indexOfFirstClass, indexOfLastClass);


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
                <Col className='d-flex justify-content-end'>
                    <Button as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`} className='w-auto'>
                        Crea nueva clase
                    </Button>
                </Col>
            </Row>
            <h1 className="text-center mb-4">Mis Clases</h1>
            <Nav className="d-flex flex-row justify-content-center align-items-center" variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
                <Nav.Item>
                    <Nav.Link eventKey="past">Pasadas</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="future">Futuras</Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Alerta si no hay clases pasadas */}
            {activeTab === "past" && pastClasses.length === 0 && (
                <Row className="d-flex justify-content-center align-items-center">
                    <Col className="d-flex justify-content-center align-items-center m-4">
                        <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-75">
                            <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2">
                                <IoIosWarning />No hay clases pasadas disponibles
                            </Alert.Heading>
                            <p>
                                Parece que aún no tienes ninguna clase pasada.
                            </p>
                        </Alert>
                    </Col>
                </Row>
            )}
            {activeTab === "future" && futureClasses.length === 0 && (
                <Row className="d-flex justify-content-center align-items-center">
                    <Col className="d-flex justify-content-center align-items-center m-4">
                        <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-75">
                            <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2">
                                <IoIosWarning />No hay clases futuras disponibles
                            </Alert.Heading>
                            <p>
                                Parece que aún no tienes ninguna clase futura.
                            </p>
                        </Alert>
                    </Col>
                </Row>
            )}
            <Row className="justify-content-center mt-3 d-flex flex-row gap-2">
                {currentClasses.map(classItem => (
                    <Col key={classItem.id} className="d-flex flex-row gap-2 justify-content-center align-items-center">
                        <Card border="primary" style={{ width: '18rem' }}>
                            <Card.Header>{classItem.class_name ? classItem.class_name : "Nombre clase"}</Card.Header>
                            <Card.Body className="d-flex justify-content-between align-items-center flex-column">
                                <section>
                                    <Card.Text>Fecha inicio: {classItem.start_date}</Card.Text>
                                    <Card.Text>Fecha fin: {classItem.end_date}</Card.Text>
                                    <Card.Text>Ciudad: {classItem.city}</Card.Text>
                                    <Card.Text>Precio: {classItem.price / 100}<span>€</span></Card.Text>
                                    <Card.Text>Capacidad: {classItem.capacity} personas</Card.Text>
                                    <Card.Text>
                                        Nivel entrenamiento: {
                                            classItem.training_level === "Advanced" ? "Avanzado" :
                                                classItem.training_level === "Intermediate" ? "Intermedio" :
                                                    classItem.training_level === "Beginner" ? "Principiante" :
                                                        classItem.training_level
                                        }
                                    </Card.Text>
                                </section>
                                <div className="d-flex flex-row gap-2 p-2 border-0">
                                    <Button variant="danger" onClick={() => handleClick(classItem.trainer, classItem.id)}>Delete</Button>
                                    <Button as={Link} to={`/trainer/${currentUser.trainer.id}/class/${classItem.id}`} onClick={() => handleDetails(classItem.id)}>Detalles</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
                <Pagination className="d-flex justify-content-center align-items-center mt-4">
                    {activeTab === "past" ? (
                        pastClasses.length > classesPerPage ? (
                            Array.from({ length: Math.ceil(pastClasses.length / classesPerPage) }).map((_, index) => (
                                <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))
                        ) : null
                    ) : (
                        futureClasses.length > classesPerPage ? (
                            Array.from({ length: Math.ceil(futureClasses.length / classesPerPage) }).map((_, index) => (
                                <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))
                        ) : null
                    )}
                </Pagination>
            </Row>
        </Container >
    )
}