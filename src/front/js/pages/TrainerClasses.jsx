import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Button, Alert, Nav, Pagination } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { useParams, Link } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";

export const TrainerClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, trainerClasses } = store;
    const { deleteTrainerClass } = actions;
    const { id } = useParams();
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
        // Filter past and future classes
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

    const paginate = (pageNumber) => setActivePage(pageNumber);

    const indexOfLastClass = activePage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses = activeTab === "past" ? pastClasses.slice(indexOfFirstClass, indexOfLastClass) : futureClasses.slice(indexOfFirstClass, indexOfLastClass);

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
            <h1 className="text-center mb-4">Mis Clases</h1>
            <Nav className="d-flex flex-row justify-content-center align-items-center" variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
                <Nav.Item>
                    <Nav.Link eventKey="past">Pasadas</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="future">Futuras</Nav.Link>
                </Nav.Item>
            </Nav>
            <Row xs={1} md={2} lg={3} className="justify-content-center">
                {currentClasses.map(classItem => (
                    <div key={classItem.id} className="d-flex gap-2 m-2 justify-content-center align-items-center">
                        <Card border="primary" style={{ width: '18rem' }}>
                            <Card.Header>{classItem.id}</Card.Header>
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <section>
                                    <Card.Text>Ciudad: {classItem.city}</Card.Text>
                                    <Card.Text>Codigo Postal:{classItem.postal_code}</Card.Text>
                                    <Card.Text>Calle: {classItem.street_name}</Card.Text>
                                    <Card.Text>Precio: {classItem.price / 100}<span>€</span></Card.Text>
                                </section>
                                <section className="d-flex flex-column gap-2">
                                    <Button variant="danger" onClick={() => handleClick(classItem.trainer, classItem.id)}>Delete</Button>
                                </section>
                            </Card.Body>
                        </Card>
                    </div>
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
