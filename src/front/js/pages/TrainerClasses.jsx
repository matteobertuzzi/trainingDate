import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Button, Alert, Nav, Pagination, Modal } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import { SpecializationModal } from "../component/SpecializationModal.jsx";

export const TrainerClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, trainerClasses } = store;
    const { deleteTrainerClass, getTrainerClasses } = actions;
    const { id } = useParams();
    const navigate = useNavigate()
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [pastClasses, setPastClasses] = useState([]);
    const [futureClasses, setFutureClasses] = useState([]);
    const [activeTab, setActiveTab] = useState("future");
    const [activePage, setActivePage] = useState(1);
    const classesPerPage = 4;
    const [showModal, setShowModal] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [showSpecializationModal, setshowSpecializationModal] = useState(false)
    const [spec, setSpec] = useState();

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
            setDeleteError('El clase no se puede cancelar, debido a que tiene usuarios apuntados');
        } else {
            setShowModal(false)
            await getTrainerClasses()
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
            <Row className="d-flex justify-content-center align-items-center">
                <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column p-3 w-auto">
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h4 className="text-center mb-2">Mis Clases</h4>
                        <h5 className="text-center">Aquí puedes encontrar un registro de tus clases pasadas y futuras.</h5>
                        <Button variant="success" as={Link} to={`/trainers/${currentUser.trainer.id}/create/class`} className='w-auto'>
                            Crea nueva clase
                        </Button>
                    </div>
                </Col>
            </Row>
            <Nav className="d-flex flex-row justify-content-center align-items-center mt-2" variant="tabs" activeKey={activeTab} onSelect={handleTabChange}>
                <Nav.Item>
                    <Nav.Link className={`${activeTab == "past" ? "bg-primary text-white " : ""}`} eventKey="past">
                        <span>Pasadas</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`${activeTab == "future" ? "bg-primary text-white " : ""}`} eventKey="future">
                        <span>Futuras</span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {activeTab === "past" && pastClasses.length === 0 && (
                <Row className="d-flex justify-content-center align-items-center mt-3">
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
                <Row className="d-flex justify-content-center align-items-center mt-3">
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
            <Row className="d-flex justify-content-center mt-3 g-4">
                {currentClasses.map(classItem => (
                    <Col className="d-flex flex-column align-items-center justify-content-evenly" key={classItem.id} xl={3} lg={4} md={6} sm={8} xs={10}>
                        <Card style={{ width: '18rem' }}>
                            <div className="position-relative">
                                <Card.Img className="img-fluid w-100 position-relative" variant="top" src={classItem.specialization.logo} />
                                <Card.ImgOverlay style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}>
                                    <Button onClick={() => { setshowSpecializationModal(true);  setSpec(classItem.specialization);}} variant="info"><span className="text-white">{classItem.specialization.name.charAt(0).toUpperCase() + classItem.specialization.name.slice(1)}</span></Button>
                                </Card.ImgOverlay>
                            </div>
                            <SpecializationModal show={showSpecializationModal} onHide={() => setshowSpecializationModal(false)} specialization={spec ? spec : classItem.specialization} />
                            <Card.Body className="d-flex flex-column align-items-start justify-content-center gap-1">
                                <Card.Text className="m-0 p-0"><strong>Fecha inicio: </strong>{new Date(classItem.start_date).toLocaleDateString()}</Card.Text>
                                <Card.Text className="m-0 p-0"><strong>Ciudad: </strong>{classItem.city}</Card.Text>
                                <Card.Text className="m-0 p-0"><strong>Precio: </strong>{classItem.price / 100}<span>€</span></Card.Text>
                                <Card.Text className="m-0 p-0"><strong>Capacidad: </strong>{classItem.capacity === 0 ? <span className="bg-danger p-1 rounded text-white">Clase completa</span> : `${classItem.capacity} personas`}</Card.Text>
                                <Card.Text>
                                    <strong>Difficultad: </strong>{
                                        classItem.training_level === "Advanced" ? <span className="text-danger p-1">Avanzado</span> :
                                            classItem.training_level === "Intermediate" ? <span className="text-warning p-1">Intermedio</span> :
                                                classItem.training_level === "Beginner" ? <span className="text-success p-1">Principiante</span> :
                                                    classItem.training_level
                                    }
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex flex-row align-items-center justify-content-evenly gap-2 p-3">
                                <Button className={classItem.capacity === 0 || activeTab === "past" ? "d-none" : ""} variant="danger" onClick={() => setShowModal(true)}>Cancelar</Button>
                                <Button variant="info" as={Link} to={`/trainer/${currentUser.trainer.id}/class/${classItem.id}`} onClick={() => handleDetails(classItem.id)}>Detalles</Button>
                            </Card.Footer>
                        </Card>
                        <Modal show={showModal} centered onHide={() => setShowModal(false)}>
                            <Modal.Header className="bg-primary text-white" closeButton>
                                <Modal.Title>Confirmación cancelación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="m-0">Recuerda que solo puedes cancelar la clase si no tienes usuarios apuntados.</p>
                                <p className="m-0">¿Estás seguro de que deseas cancelar esta clase?</p>
                                {deleteError && <div className="text-danger mt-2">{deleteError}</div>}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                                <Button variant="danger" onClick={() => handleClick(classItem.trainer, classItem.id)}>Confirmar</Button>
                            </Modal.Footer>
                        </Modal>
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