import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Button, Alert, Nav, Pagination } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";

const AllClasses = () => {
    const { store, actions } = useContext(Context);
    const { allClasses } = store;
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
        allClasses.forEach(classItem => {
            const classStartTime = new Date(classItem.start_date);
            if (classStartTime <= currentDateTime) {
                past.push(classItem);
            } else {
                future.push(classItem);
            }
        });
        setPastClasses(past);
        setFutureClasses(future);
    }, [allClasses, currentDateTime]);

    const handleClick = async (trainerId, classId) => {
        // Handle click logic here
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
            </Row>
            <h1 className="text-center mb-4">Todas las Clases</h1>
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
                                <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => paginate(index + 1)} style={{ backgroundColor: '#e95420 !important', color: 'white !important' }}>
                                    {index + 1}
                                </Pagination.Item>
                            ))
                        ) : null
                    ) : (
                        futureClasses.length > classesPerPage ? (
                            Array.from({ length: Math.ceil(futureClasses.length / classesPerPage) }).map((_, index) => (
                                <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => paginate(index + 1)} style={{ backgroundColor: '#e95420 !important', color: 'white !important' }}>
                                    {index + 1}
                                </Pagination.Item>
                            ))
                        ) : null
                    )}
                </Pagination>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
                {(activeTab === "past" && pastClasses.length === 0) && (
                    <Col className="d-flex justify-content-center align-items-center m-3">
                        <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-75">
                            <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases pasadas disponibles</Alert.Heading>
                        </Alert>
                    </Col>
                )}
                {(activeTab === "future" && futureClasses.length === 0) && (
                    <Col className="d-flex justify-content-center align-items-center m-4">
                        <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-75">
                            <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases futuras disponibles</Alert.Heading>
                            <p>
                                Parece que aún no tienes ninguna clase futura.
                            </p>
                        </Alert>
                    </Col>
                )}
            </Row>
        </Container >
    )
};

export default AllClasses;
