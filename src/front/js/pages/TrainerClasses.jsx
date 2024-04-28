import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Button, Alert, Nav, Pagination, Modal } from 'react-bootstrap';
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
    const [showModal, setShowModal] = useState(false);

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
        const deleteClass = await deleteTrainerClass(trainerId, classId);
        if (!deleteClass) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }

    const handleDetails = async (classId) => {
        await actions.getTrainerClassDetails(classId)
    }

    const paginate = (pageNumber) => setActivePage(pageNumber);

    const indexOfLastClass = activePage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses = activeTab === "past" ? pastClasses.slice(indexOfFirstClass, indexOfLastClass) : futureClasses.slice(indexOfFirstClass, indexOfLastClass);

    const handleTabChange = (selectedKey) => {
        setActiveTab(selectedKey);
        setActivePage(1);
    };

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
            <Nav className="d-flex flex-row justify-content-center align-items-center" variant="tabs" activeKey={activeTab} onSelect={handleTabChange}>
                <Nav.Item>
                    <Nav.Link eventKey="past">Pasadas</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="future">Futuras</Nav.Link>
                </Nav.Item>
            </Nav>

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
                            <Card.Header><strong>{classItem.class_name ? classItem.class_name : "Nombre clase"}</strong></Card.Header>
                            <Card.Body className="d-flex flex-column align-items-start justify-content-center gap-1">
                                <Card.Text className="m-0 p-0"><strong>Fecha inicio: </strong>{new Date(classItem.start_date).toLocaleDateString()}</Card.Text>
                                <Card.Text className="m-0 p-0"><strong>Fecha fin: </strong>{new Date(classItem.end_date).toLocaleDateString()}</Card.Text>
                                <Card.Text className="m-0 p-0"><strong>Precio: </strong>{classItem.price / 100}<span>€</span></Card.Text>
                                <Card.Text className="m-0 p-0"><strong>Capacidad: </strong>{classItem.capacity === 0 ? <span className="bg-danger p-1 rounded text-white">Clase completa</span> : `${classItem.capacity} personas`}</Card.Text>
                                <Card.Text>
                                    <strong>Difficultad: </strong>{
                                        classItem.training_level === "Advanced" ? <span className="bg-danger p-1 rounded text-white">Avanzado</span> :
                                            classItem.training_level === "Intermediate" ? <span className="bg-warning p-1 rounded text-white">Intermedio</span> :
                                                classItem.training_level === "Beginner" ? <span className="bg-success p-1 rounded text-white">Principiante</span> :
                                                    classItem.training_level
                                    }
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex flex-row align-items-center justify-content-evenly gap-2 p-3">
                                <Button className={classItem.capacity === 0 ? "d-none" : ""} variant="danger" onClick={() => handleClick(classItem.trainer, classItem.id)}>Cancelar</Button>
                                <Button as={Link} to={`/trainer/${currentUser.trainer.id}/class/${classItem.id}`} onClick={() => handleDetails(classItem.id)}>Detalles</Button>
                            </Card.Footer>
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>La clase no se puede cancelar debido a que tienes usuarios apuntados</Modal.Body>
            </Modal>
        </Container >
    )
}