import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card, Pagination, Alert, Button, Navbar, Offcanvas } from 'react-bootstrap';
import MapModal from "/workspaces/sp54-final-project-g3/src/front/js/component/MapModal.jsx";
import ClassModal from '../component/ClassModal.jsx';
import { IoIosWarning } from "react-icons/io";
import HomeFilters from '../component/HomeFilters.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHeartCirclePlus, faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons';

export const AllClassesDavide = ({ filters }) => {
    const { store, actions } = useContext(Context);
    const { currentUser, allClasses, userClasses, favourites } = store;
    const { postUserClass, deleteUserClass } = actions;
    const [showFilters, setShowFilters] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const currentTime = new Date().getTime();

    const filteredClasses = allClasses.filter(oneClass => new Date(oneClass.start_date).getTime() > currentTime);

    const paginate = (pageNumber) => setActivePage(pageNumber);
    const classesPerPage = 2;
    const indexOfLastClass = activePage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses = filteredClasses.slice(indexOfFirstClass, indexOfLastClass);

    return (
        <div className="d-flex flex-column flex-md-row">
            <Navbar className="bg-warning d-block d-md-none p-2 d-flex flex-row justify-content-start align-items-center">
                <span>Filtros </span><FontAwesomeIcon icon={faFilter} onClick={() => setShowFilters(!showFilters)} />
            </Navbar>
            <Navbar className="bg-warning d-none d-md-block">
                <Navbar.Toggle className="d-md-none" aria-controls="offcanvasNavbar-expand-sm" />
                <HomeFilters location='allClasses' />
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
            <Container className="min-vh-100 py-4 d-flex flex-column justify-content-center gap-2">
                {currentClasses.length > 0 ? (
                    currentClasses.map((oneClass) => (
                        <Row className="d-flex align-items-center justify-content-center " key={oneClass.id}>
                            <Col lg={10}>
                                <Card className="d-flex flex-column">
                                    <Card.Header>
                                        {oneClass.class_name || "Nombre clase"}
                                    </Card.Header>
                                    <div className="d-flex flex-column flex-md-row">
                                        <Card.Body className="d-flex flex-row justify-content-between align-items-center">
                                            <section className="d-flex flex-row gap-1">
                                                <div>
                                                    <Card.Text >
                                                        <strong>Ciudad: </strong>{oneClass.city}
                                                    </Card.Text>
                                                    <Card.Text className="d-none d-md-block">
                                                        <strong>Codigo Postal: </strong>{oneClass.postal_code}
                                                    </Card.Text>
                                                </div>
                                                <div>
                                                    <Card.Text >
                                                        <strong>Precio: </strong>{oneClass.price / 100}<span> €</span>
                                                    </Card.Text>
                                                    <Card.Text >
                                                        <strong>Inicio: </strong> {new Date(oneClass.start_date).toLocaleDateString()}
                                                    </Card.Text>
                                                </div>
                                                <div>
                                                    <Card.Text className="d-none d-md-block">
                                                        <strong>Capacidad: </strong>{oneClass.capacity}<span> personas</span>
                                                    </Card.Text>
                                                    <Card.Text >
                                                        <strong>Nivel entrenamiento: </strong>
                                                        {oneClass.training_level === "Advanced" ? <span className="bg-danger p-1 rounded text-white">Avanzado</span> :
                                                            oneClass.training_level === "Intermediate" ? <span className="bg-warning p-1 rounded text-white">Intermedio</span> :
                                                                oneClass.training_level === "Beginner" ? <span className="bg-success p-1 rounded text-white">Principiante</span> :
                                                                    ""}
                                                    </Card.Text>
                                                    <Card.Text >
                                                        <strong>Tipo entrenamiento: </strong>{oneClass.training_type}
                                                    </Card.Text>
                                                    {oneClass.additional_info && (
                                                        <Card.Text>
                                                            <strong>Información adicional: </strong>{oneClass.additional_info}
                                                        </Card.Text>
                                                    )}
                                                </div>
                                            </section>
                                        </Card.Body>
                                        <div className="d-flex flex-row flex-md-column align-items-center justify-content-evenly gap-2 p-3">
                                            {oneClass.capacity < 1 ? (
                                                <Button disabled className="bg-danger">Clase completa</Button>
                                            ) : (
                                                <>
                                                    <ClassModal userClass={oneClass} />
                                                    <MapModal className='mx-3' addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                                                    {favourites && favourites.includes && favourites.includes(oneClass.id) ? (
                                                        <>
                                                            <Button className="d-none d-md-block" onClick={async () => await deleteUserClass(currentUser.user.id, oneClass.id)} variant="danger">
                                                                <span>No estoy interesado</span>
                                                            </Button>
                                                            <FontAwesomeIcon size="2x" onClick={async () => await deleteUserClass(currentUser.user.id, oneClass.id)} className="d-block d-md-none" icon={faHeartCircleMinus} />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button className="d-none d-md-block" onClick={async () => await postUserClass(oneClass.price, oneClass.id)} variant="success">
                                                                <span>Estoy interesado</span>
                                                            </Button>
                                                            <FontAwesomeIcon onClick={async () => await postUserClass(oneClass.price, oneClass.id)} size="2x" className="d-block d-md-none" icon={faHeartCirclePlus} />
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    ))
                ) : (
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col className="d-flex justify-content-center align-items-center m-4">
                            <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center w-75">
                                <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases futuras disponibles</Alert.Heading>
                                <p>
                                    Parece que aún no tienes ninguna clase futura.
                                </p>
                            </Alert>
                        </Col>
                    </Row>
                )}
                <Pagination className="d-flex justify-content-center align-items-center mt-4">
                    {filteredClasses.length > classesPerPage ? (
                        Array.from({ length: Math.ceil(filteredClasses.length / classesPerPage) }).map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === activePage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))
                    ) : null}
                </Pagination>
            </Container >
        </div>
    );
};
