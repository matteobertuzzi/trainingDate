import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Container, Row, Col, Card, Pagination, Alert, Button, Navbar, Offcanvas, Form } from 'react-bootstrap';
import MapModal from "/workspaces/sp54-final-project-g3/src/front/js/component/MapModal.jsx";
import ClassModal from '../component/ClassModal.jsx';
import { IoIosWarning } from "react-icons/io";
import HomeFilters from '../component/HomeFilters.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHeartCirclePlus, faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons';

export const AllClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, allClasses, userClasses, favourites } = store;
    const { postUserClass, deleteUserClass } = actions;
    const [showFilters, setShowFilters] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [filterClasses, setFilterClasses] = useState([])
    const currentTime = new Date().getTime();

    const filteredClasses = allClasses.filter(oneClass => new Date(oneClass.class_details.start_date).getTime() > currentTime);

    const paginate = (pageNumber) => setActivePage(pageNumber);
    const classesPerPage = 4;
    const indexOfLastClass = activePage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses = filteredClasses.length > 0 && filterClasses.length > 0 ? filterClasses.slice(indexOfFirstClass, indexOfLastClass) : filteredClasses.length > 0 && filterClasses.length === 0 ? filteredClasses.slice(indexOfFirstClass, indexOfLastClass) : filterClasses.length === 0 ? [] : []

    const handleFilterSubmit = (event, filters) => {
        event.preventDefault();
        const { searchCity, startDate, trainingType, trainingLevel } = filters;
        let result = filteredClasses.filter((oneClass) => {
            let matchesSearchCity = true;
            let matchesStartDate = true;
            let matchesTrainingType = true;
            let matchesTrainingLevel = true;

            if (searchCity && !oneClass.class_details.city.toLowerCase().includes(searchCity.toLowerCase())) {
                matchesSearchCity = false;
            }
            if (startDate && !isSameDay(oneClass.class_details.start_date, startDate)) {
                matchesStartDate = false;
            }
            if (trainingType && oneClass.specialization.id !== parseInt(trainingType)) {
                matchesTrainingType = false;
            }
            if (trainingLevel && oneClass.class_details.training_level !== trainingLevel) {
                matchesTrainingLevel = false;
            }

            return matchesSearchCity && matchesStartDate && matchesTrainingType && matchesTrainingLevel;
        });
        if (result.length === 0) {
            setFilterClasses([]);
        } else {
            setFilterClasses(result);
        }
        setActivePage(1);
    };

    const isSameDay = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    return (
        <div className="d-flex flex-column flex-md-row">
            <Navbar className="bg-warning d-block d-md-none p-2 d-flex flex-row justify-content-start align-items-center">
                <span>Filtros </span><FontAwesomeIcon icon={faFilter} onClick={() => setShowFilters(!showFilters)} />
            </Navbar>
            <Navbar className="bg-warning d-none d-md-block">
                <Navbar.Toggle className="d-md-none" aria-controls="offcanvasNavbar-expand-sm" />
                <HomeFilters onFilterSubmit={handleFilterSubmit} />
            </Navbar>
            <Navbar.Offcanvas
                className="d-md-none w-auto p-2 d-flex flex-columns justify-content-center align-items-center"
                show={showFilters}
                onHide={() => setShowFilters(false)}
                placement="start"
                aria-labelledby="offcanvasNavbarLabel-expand-md">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <HomeFilters location='allClasses' />
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            <Container className="min-vh-100 my-2 d-flex flex-column justify-content-center gap-2">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column border rounded justify-content-center align-items-center p-3">
                        <h4>Descubre todas las clases disponibles!</h4>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-2">
                    {currentClasses.length === 0 ? (
                        <Col className="d-flex justify-content-center align-items-center m-4">
                            <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-75">
                                <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases disponibles</Alert.Heading>
                                <p>
                                    Parece que no hay ninguna clase.
                                </p>
                            </Alert>
                        </Col>
                    ) : (
                        currentClasses.map((oneClass) => (
                            <Col className={`d-flex flex-row align-items-center justify-content-center mb-1 ${favourites.includes(oneClass.class_details.id) ? 'd-none' : ''}`} lg={4} md={5} sm={8} xs={10}>
                                <Card className={`d-flex flex-column ${favourites.includes(oneClass.class_details.id) ? 'border-3 border-success' : ''}`}>
                                    <Card.Img className="img-fluid w-100" variant="top" src={oneClass.specialization.logo} />
                                    <Card.ImgOverlay style={{ position: 'absolute', top: 0, right: 0, bottom: '55%', filter: 'brightness(90%)' }}>
                                        {oneClass.specialization.name}
                                    </Card.ImgOverlay>
                                    <Card.Body className="d-flex flex-column gap-1 justify-content-between align-items-start">
                                        <Card.Text className="m-0 p-0">
                                            <strong>Ciudad: </strong>{oneClass.class_details.city}
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Precio: </strong>{oneClass.class_details.price / 100}<span> €</span>
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Inicio: </strong> {new Date(oneClass.class_details.start_date).toLocaleDateString()}
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Capacidad: </strong>{oneClass.class_details.capacity}<span> personas</span>
                                        </Card.Text>
                                        <Card.Text className="m-0 p-0">
                                            <strong>Nivel entrenamiento: </strong>
                                            {oneClass.class_details.training_level === "Advanced" ? <span className="bg-danger p-1 rounded text-white">Avanzado</span> :
                                                oneClass.class_details.training_level === "Intermediate" ? <span className="bg-warning p-1 rounded text-white">Intermedio</span> :
                                                    oneClass.class_details.training_level === "Beginner" ? <span className="bg-success p-1 rounded text-white">Principiante</span> :
                                                        ""}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="d-flex flex-row align-items-center justify-content-evenly gap-2 p-3">
                                        {oneClass.class_details.capacity < 1 ? (
                                            <Button disabled className="bg-danger">Clase completa</Button>
                                        ) : (
                                            <>
                                                <ClassModal userClass={oneClass} />
                                                <MapModal className='mx-3' addressData={[oneClass.class_details.city, oneClass.class_details.postal_code, oneClass.class_details.street_name, oneClass.class_details.street_number]} />
                                                {favourites && favourites.includes && favourites.includes(oneClass.class_details.id) ? (
                                                    <Button onClick={async () => await deleteUserClass(currentUser.user.id, oneClass.class_details.id)} variant="btn btn-outline-danger">
                                                        <FontAwesomeIcon size="2x" icon={faHeartCircleMinus} />
                                                    </Button>
                                                ) : (
                                                    <Button onClick={async () => await postUserClass(oneClass.class_details.price, oneClass.class_details.id)} variant="btn btn-outline-success">
                                                        <FontAwesomeIcon size="2x" icon={faHeartCirclePlus} />
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
                <Pagination className="d-flex justify-content-center align-items-center mt-4">
                    {filterClasses.length > 0 ? (
                        Array.from({ length: Math.ceil(filterClasses.length / classesPerPage) }).map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === activePage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))
                    ) : (
                        Array.from({ length: Math.ceil(filteredClasses.length / classesPerPage) }).map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === activePage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))
                    )}
                </Pagination>
            </Container >
        </div>
    );
};
