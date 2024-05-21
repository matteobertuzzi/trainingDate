import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Container, Row, Col, Card, Pagination, Alert, Button, Navbar, Offcanvas, Form } from 'react-bootstrap';
import MapModal from "/workspaces/sp54-final-project-g3/src/front/js/component/MapModal.jsx";
import ClassModal from '../component/ClassModal.jsx';
import { IoIosWarning } from "react-icons/io";
import HomeFilters from '../component/HomeFilters.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHeartCirclePlus, faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { SpecializationModal } from "../component/SpecializationModal.jsx";

export const AllClasses = () => {
    const { store, actions } = useContext(Context);
    const { currentUser, allClasses, userClasses, activeNavTab } = store;
    const { postUserClass, setActiveNavTab } = actions;
    const [showFilters, setShowFilters] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [activePage, setActivePage] = useState(1);
    const [filterClasses, setFilterClasses] = useState([])
    const currentTime = new Date().getTime();
    const [showSpecializationModal, setshowSpecializationModal] = useState(false)
    const [spec, setSpec] = useState();

    const filteredClasses = allClasses.filter(oneClass => {
        return !userClasses.some(userclass => userclass.trainer_class.class_details.id === oneClass.class_details.id);
    });

    const paginate = (pageNumber) => setActivePage(pageNumber);
    const classesPerPage = 8;
    const indexOfLastClass = activePage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses =
        filteredClasses.length > 0 && filterClasses.length > 0
            ? filterClasses.slice(indexOfFirstClass, indexOfLastClass)
            : filteredClasses.length > 0 && filterClasses.length === 0
                ? filteredClasses.slice(indexOfFirstClass, indexOfLastClass)
                : filterClasses.length == 0 && filteredClasses.length == 0
                    ? []
                    : null;

    const handleFilterSubmit = (event, filters) => {
        event.preventDefault();
        const { searchCity, startDate, trainingType, trainingLevel, maxPrice, minPrice } = filters;
        let result = filteredClasses.filter((oneClass) => {
            let matchesSearchCity = true;
            let matchesStartDate = true;
            let matchesTrainingType = true;
            let matchesTrainingLevel = true;
            let matchesPrice = true;

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

            if ((maxPrice || minPrice) && ((oneClass.class_details.price / 100) < minPrice || (oneClass.class_details.price / 100) > maxPrice)) {
                matchesPrice = false;
            }
            return matchesSearchCity && matchesStartDate && matchesTrainingType && matchesTrainingLevel && matchesPrice;
        });
        console.log('Resultados filtrados:', result);
        if (!result || result.length == 0) {
            setShowAlert(true)
            setFilterClasses([]);
        } else {
            setFilterClasses(result);
            setActivePage(1)
            setShowAlert(false);;
        }
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
            <Navbar className="bg-warning d-block d-md-none p-2 d-flex flex-row gap-1 justify-content-start align-items-center">
                <span className="ms-3">Filtros </span><FontAwesomeIcon icon={faFilter} onClick={() => setShowFilters(!showFilters)} />
            </Navbar>
            <Navbar className="bg-warning d-none d-md-block">
                <Navbar.Toggle className="d-md-none" aria-controls="offcanvasNavbar-expand-sm" />
                <HomeFilters onFilterSubmit={handleFilterSubmit} />
            </Navbar>
            <Navbar.Offcanvas
                style={{ boxShadow: 'inset 0 0 50px rgba(255, 165, 0, 0.5)' }}
                className="d-md-none w-auto p-2 d-flex flex-columns justify-content-center align-items-center"
                show={showFilters}
                onHide={() => setShowFilters(false)}
                placement="start"
                aria-labelledby="offcanvasNavbarLabel-expand-md">
                <Offcanvas.Header className="border-bottom d-flex flex-row justify-content-center align-items-center w-75" closeButton>
                    <Offcanvas.Title className="ms-5 d-flex flex-row justify-content-center align-items-center gap-2">
                        <h3>Filtros</h3><FontAwesomeIcon icon={faFilter} />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <HomeFilters onFilterSubmit={handleFilterSubmit} />
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            <Container className="min-vh-100 my-4">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column p-3 w-auto">
                        <div className="border rounded p-4 d-flex justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                            <h4>Descubre todas las clases disponibles!</h4>
                        </div>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-2">
                    {showAlert || filteredClasses.length == 0 || (filterClasses.length != 0 && filteredClasses.length == 0) ? (
                        <Col className="d-flex justify-content-center align-items-center m-4 w-auto">
                            <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center">
                                <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2">
                                    <IoIosWarning />No hay clases disponibles
                                </Alert.Heading>
                                <p>Parece que no hay ninguna clase.</p>
                            </Alert>
                        </Col>
                    ) : (
                        currentClasses.map((oneClass) => (
                            currentClasses.length > 0 && !userClasses.some(userclass => userclass.trainer_class.class_details.id === oneClass.class_details.id)
                                ? (
                                    <Col key={oneClass.class_details.id} className="d-flex flex-row align-items-center justify-content-center mb-3" xl={3} lg={4} md={6} sm={8} xs={10}>
                                        <Card className="d-flex flex-column" style={{width: "270px"}}>
                                        <SpecializationModal show={showSpecializationModal} onHide={() => setshowSpecializationModal(false)} specialization={spec ? spec : oneClass.specialization} />
                                            <div className="position-relative">
                                                <Card.Img className="img-fluid w-100" variant="top" src={oneClass.specialization.logo} style={{height: "200px"}}/>
                                                <Card.ImgOverlay style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}>
                                                    <Button variant="info" onClick={() => { setshowSpecializationModal(true);  setSpec(oneClass.specialization);}}><span className="text-white"> {oneClass.specialization.name.charAt(0).toUpperCase() + oneClass.specialization.name.slice(1)}</span></Button>
                                                </Card.ImgOverlay>
                                            </div>
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
                                                    <strong>Difficultad: </strong>
                                                    {oneClass.class_details.training_level === "Advanced" ? <span className="text-danger p-1">Avanzado</span> :
                                                        oneClass.class_details.training_level === "Intermediate" ? <span className="text-warning p-1">Intermedio</span> :
                                                            oneClass.class_details.training_level === "Beginner" ? <span className="text-success p-1 ">Principiante</span> :
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
                                                        <Button onClick={async () => await postUserClass(oneClass.class_details.price, oneClass.class_details.id)} variant="btn btn-outline-success">
                                                            <FontAwesomeIcon size="2x" icon={faHeartCirclePlus} />
                                                        </Button>
                                                    </>
                                                )}
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ) : null
                        ))
                    )}
                </Row>
                {filterClasses.length > 0 && (
                    <Pagination className="d-flex justify-content-center align-items-center mt-4">
                        {Array.from({ length: Math.ceil(filterClasses.filter(oneClass => !userClasses.some(userclass => userclass.trainer_class.class_details.class === oneClass.class_details.id)).length / classesPerPage) }).map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === activePage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                )}
                {filterClasses.length === 0 && filteredClasses.length > 0 && (
                    <Pagination className="d-flex justify-content-center align-items-center mt-4">
                        {Array.from({ length: Math.ceil(filteredClasses.filter(oneClass => !userClasses.some(userclass => userclass.trainer_class.class_details.class === oneClass.class_details.id)).length / classesPerPage) }).map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === activePage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                )}
            </Container >
        </div >
    );
};
