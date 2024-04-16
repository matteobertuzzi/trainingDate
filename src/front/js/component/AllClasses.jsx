import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Pagination, Alert, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import MapModal from "./MapModal.jsx";
import ClassModal from "./ClassModal.jsx";
import HomeFilters from "./HomeFilters.jsx";
import FilterAlert from "./FilterAlert.jsx";

const AllClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, allClasses, userClasses } = store;
    const { postUserClass, deleteUserClass } = actions;
    const [interested, setInterested] = useState(false);
    const [merge, setMerge] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [activePage, setActivePage] = useState(1);
    const classesPerPage = 4;
    const [showAlert, setShowAlert] = useState(false);
    const [searchCity, setSearchCity] = useState("");
    const [filters, setFilters] = useState({
        trainingLevel: '',
        trainingType: ''
    });

    const handleFilterSubmit = (event, filters) => {
        setFilters(filters);
        console.log('Filters submitted:', filters);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const paginate = (pageNumber) => setActivePage(pageNumber);

    const indexOfLastClass = activePage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses = allClasses.slice(indexOfFirstClass, indexOfLastClass);

    const { createCheckoutSession } = actions;

    useEffect(() => {
        checkClasses();
        mergeClasses();
    }, []);

    const checkClasses = () => {
        if (userClasses.length !== 0) {
            userClasses.map((userClass) => {
                for (let i = 0; i < allClasses.length; i++) {
                    if (allClasses[i].id === userClass.class) {
                        allClasses[i]["isInterested"] = false;
                        console.log('No interest', allClasses[i]);
                    } else {
                        allClasses[i]["isInterested"] = true;
                        console.log('Interest', allClasses[i]);
                    }
                }
            })
        } else {
            for (let i = 0; i < allClasses.length; i++) {
                allClasses[i]["isInterested"] = true;
                console.log(allClasses[i]);
                setInterested(true);
                console.log('hey!')
            }
        }
    };

    const handleCheckout = async (productId, customerId) => {
        await createCheckoutSession(productId, customerId);
    };

    const handleInterested = async (value, classId, price) => {
        try {
            if (!value) {
                await deleteUserClass(currentUser.user.id, classId);
                setInterested(value);
            } else {
                await postUserClass(price, classId);
                setInterested(!value);
            }
            allClasses.map(oneClass => {
                if (oneClass.id === classId) {
                    oneClass["isInterested"] = !value;
                    return;
                }
                return;
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

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

    let filteredClasses = allClasses.filter((cls) => {
        return cls.training_type === parseInt(filters.trainingType) && cls.training_level === filters.trainingLevel;
    });

    return (
        <Container className="min-vh-100 my-4">
            <Row className='m-3 d-flex flex-row gap-2 justify-content-between align-items-center'>
                <Col>
                    <Link to={"/"}>
                        <RiArrowGoBackLine /> Volver atrás
                    </Link>
                </Col>
            </Row>
            <Row className='m-3 d-flex flex-row gap-2 justify-content-between align-items-center'>
                <HomeFilters filters={filters} onFilterSubmit={handleFilterSubmit} />
            </Row>
            <h1 className="text-center mb-4">Todas las Clases</h1>
            {(filteredClasses.length === 0 && filters.trainingType !== '' && filters.trainingLevel !== '') ? <FilterAlert location='classList' showAlert={setShowAlert} /> : <></>}
            <Row xs={1} md={2} lg={3} className="justify-content-center">
                {filteredClasses.length > 0 ? (
                    filteredClasses.map(classItem => (
                        <Col key={classItem.id} className="mb-4">
                            <Card border="primary">
                                <Card.Header>{classItem.class_name}</Card.Header>
                                <Card.Body >
                                    <Card.Text><strong>Ciudad:</strong> {classItem.city}</Card.Text>
                                    <Card.Text><strong>Código Postal:</strong> {classItem.postal_code}</Card.Text>
                                    <Card.Text><strong>Calle:</strong> {classItem.street_name}</Card.Text>
                                    <Card.Text><strong>Precio:</strong> {classItem.price / 100}<span>€</span></Card.Text>
                                    <Card.Text><strong>Capacidad:</strong> {classItem.capacity}</Card.Text>
                                    <Card.Text><strong>Nivel de entrenamiento:</strong> {
                                        classItem.training_level === "Advanced" ? "Avanzado" :
                                            classItem.training_level === "Intermediate" ? "Intermedio" :
                                                classItem.training_level === "Beginner" ? "Principiante" :
                                                    classItem.training_level
                                    }</Card.Text>
                                </Card.Body>
                                <Card.Footer className='p-3'>
                                    {classItem.capacity < 1 ? (
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <Button variant='danger' disabled>Clase completa!</Button>
                                        </div>
                                    ) : (
                                        <div className='d-flex flex-column gap-2'>
                                            <ClassModal userClass={classItem} />
                                            {merge.find(mergedItem => mergedItem.class === classItem.id && mergedItem.stripe_status === 'Paid') ? (
                                                <Button variant="success" className="btn-responsive" disabled>Clase pagada</Button>
                                            ) : (
                                                <>
                                                    <Button variant={classItem.isInterested ? "primary" : "danger"} className="btn-responsive" onClick={() => {
                                                        handleInterested(classItem.isInterested, classItem.id, classItem.price);
                                                        classItem.isInterested = !classItem.isInterested;
                                                    }}>
                                                        {classItem.isInterested ? "Estoy interesado" : "No estoy interesado"}
                                                    </Button>
                                                    {classItem.isInterested === false ? (
                                                        <Button className="btn-responsive" onClick={() => { handleCheckout(classItem.stripe_product_id, currentUser.user.stripe_customer_id) }}>Checkout!</Button>
                                                    ) : null}
                                                </>
                                            )}
                                            <MapModal className='mx-3' addressData={[classItem.city, classItem.postal_code, classItem.street_name, classItem.street_number]} />
                                        </div>

                                    )}
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                ) : (
                    currentClasses.map(classItem => (
                        <Col key={classItem.id} className="mb-4">
                            <Card border="primary">
                                <Card.Header>{classItem.class_name}</Card.Header>
                                <Card.Body >
                                    <Card.Text><strong>Ciudad:</strong> {classItem.city}</Card.Text>
                                    <Card.Text><strong>Código Postal:</strong> {classItem.postal_code}</Card.Text>
                                    <Card.Text><strong>Calle:</strong> {classItem.street_name}</Card.Text>
                                    <Card.Text><strong>Precio:</strong> {classItem.price / 100}<span>€</span></Card.Text>
                                    <Card.Text><strong>Capacidad:</strong> {classItem.capacity}</Card.Text>
                                    <Card.Text><strong>Nivel de entrenamiento:</strong> {classItem.training_level === 'Beginner' ? 'Principiante' :
                                        classItem.training_level === 'Intermediate' ? 'Intermedio' : classItem.training_level}</Card.Text>
                                </Card.Body>
                                <Card.Footer className='p-3'>
                                    {classItem.capacity < 1 ? (
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <Button variant='danger' disabled>Clase completa!</Button>
                                        </div>
                                    ) : (
                                        <div className='d-flex flex-column gap-2'>
                                            <ClassModal userClass={classItem} />
                                            {merge.find(mergedItem => mergedItem.class === classItem.id && mergedItem.stripe_status === 'Paid') ? (
                                                <Button variant="success" className="btn-responsive" disabled>Clase pagada</Button>
                                            ) : (
                                                <>
                                                    <Button variant={classItem.isInterested === false ? "danger" : "primary"} className="btn-responsive" onClick={() => {
                                                        handleInterested(classItem.isInterested, classItem.id, classItem.price);
                                                        classItem.isInterested = !classItem.isInterested;
                                                    }}>
                                                        {classItem.isInterested === false ? "No estoy interesado" : "Estoy interesado"}
                                                    </Button>
                                                    {classItem.isInterested === false ? (
                                                        <Button className="btn-responsive" onClick={() => { handleCheckout(classItem.stripe_product_id, currentUser.user.stripe_customer_id) }}>Checkout!</Button>
                                                    ) : null}
                                                </>
                                            )}
                                            <MapModal className='mx-3' addressData={[classItem.city, classItem.postal_code, classItem.street_name, classItem.street_number]} />
                                        </div>

                                    )}
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
                <Pagination className="d-flex justify-content-center align-items-center mt-4">
                    {allClasses.length > classesPerPage ? (
                        Array.from({ length: Math.ceil(allClasses.length / classesPerPage) }).map((_, index) => (
                            <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => paginate(index + 1)} style={{ backgroundColor: '#e95420 !important', color: 'white !important' }}>
                                {index + 1}
                            </Pagination.Item>
                        ))
                    ) : null}
                </Pagination>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
                {(allClasses.length === 0) && (
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
        </Container>
    );
};

export default AllClasses;