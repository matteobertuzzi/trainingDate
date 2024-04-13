import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Button, Alert, Nav } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
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
                {(activeTab === "past" && pastClasses.length !== 0) && (
                    <div className="d-flex flex-row flex-wrap align-items-center justify-content-center">
                        {pastClasses.map(classItem => (
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
                    </div>
                )}
            </Row>
            <Row>
                {(activeTab === "future" && futureClasses.length !== 0) && (
                    <div className="d-flex flex-row flex-wrap align-items-center justify-content-center">
                        {futureClasses.map(classItem => (
                            <div key={classItem.id} className="d-flex gap-2 m-3 justify-content-center align-items-center">
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
                    </div>
                )}
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
