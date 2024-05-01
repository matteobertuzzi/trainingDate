import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, InputGroup, Row, Container, Toast } from 'react-bootstrap';
import Loading from '../component/Loading.jsx';
import { RiArrowGoBackLine } from "react-icons/ri";


export const CreateClass = () => {
    const [validated, setValidated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const { currentUser } = store
    const { postTrainerClasses, getTrainerClasses, getAllClasses } = actions
    const params = useParams()
    const { trainerId } = params
    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({
        city: "",
        postal_code: "",
        street_name: "",
        street_number: "",
        additional_info: "",
        capacity: "",
        start_date: "",
        end_date: "",
        price: "",
        training_level: "",
        training_type: "",
        class_name: "",
        class_details: ""
    })

    const handleChange = (e) => {
        e.persist();
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const isDateValid = () => {
        return inputs.start_date <= inputs.end_date;
    };

    const handleSubmit = async (event) => {
        console.log("handleSubmit() se está llamando.");
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false || !isDateValid()) {
            event.stopPropagation();
        }

        setValidated(true);
        const postClass = await postTrainerClasses(inputs);
        if (!postClass) {
            setError('Los datos son incompletos o incorrectos. Por favor, inténtalo de nuevo.');
        } else {
            handleShowToast()
            setError(null);
            await getTrainerClasses()
            await getAllClasses()
            navigate(`/trainer/${currentUser.trainer.id}/classes`)
        }
    };

    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 7000);
    };


    if (!currentUser || !currentUser.trainer) {
        return <Loading />;
    }

    return (
        <Container className="d-flex flex-column min-vh-100 my-4">
            <Row className="d-flex justify-content-center align-items-center">
                <Col lg={8} md={10} sm={10} xs={10} className="d-flex flex-column p-3 w-auto">
                    <div className="border rounded p-4 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)' }}>
                        <h3>Rellena el formulario para crear la clase!</h3>
                    </div>
                </Col>
            </Row>
            {currentUser.trainer ? (
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-100 w-md-75 border rounded p-3">
                    <fieldset>
                        <legend>Dirección</legend>
                        <Row className="mb-3">
                            <Col md="6">
                                <Form.Group controlId="city">
                                    <Form.Label>Ciudad:</Form.Label>
                                    <Form.Control required type="text" placeholder="Ciudad" value={inputs.city || ""} onChange={handleChange} name="city" />
                                    <Form.Control.Feedback type="invalid">Por favor, elige una ciudad.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group controlId="postal_code">
                                    <Form.Label>Código Postal:</Form.Label>
                                    <Form.Control pattern="[0-9]{5}" isInvalid={!/^([0-9]{5})?$/.test(inputs.postal_code)} required type="number" placeholder="Código Postal" value={inputs.postal_code || ""} onChange={handleChange} name="postal_code" autoComplete="postal_code" />
                                    <Form.Control.Feedback type="invalid">Por favor, elige un código postal válido.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* Agrega más campos relacionados con la dirección aquí */}
                    </fieldset>

                    <fieldset>
                        <legend>Horario</legend>
                        <Row className="mb-3">
                            <Col md="6">
                                <Form.Group controlId="startClass">
                                    <Form.Label>Inicio clase:</Form.Label>
                                    <Form.Control isInvalid={!isDateValid()} required type="datetime-local" value={inputs.start_date || ""} onChange={handleChange} name="start_date" />
                                    <Form.Control.Feedback type="invalid">Por favor, elige una fecha válida.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group controlId="endClass">
                                    <Form.Label>Fin de clase:</Form.Label>
                                    <Form.Control isInvalid={!isDateValid()} required type="datetime-local" value={inputs.end_date || ""} onChange={handleChange} name="end_date" />
                                    <Form.Control.Feedback type="invalid">Por favor, elige una fecha válida.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </fieldset>

                    <fieldset>
                        <legend>Tipo de clase</legend>
                        <Row className="mb-3">
                            <Col md="6">
                                <Form.Group controlId="training_level">
                                    <Form.Label>Nivel de entrenamiento:</Form.Label>
                                    <div className="d-flex flex-row gap-3">
                                        <Form.Check type="radio" id="beginner" name="training_level" label="Principiante" value="Beginner" onChange={handleChange} required />
                                        <Form.Check type="radio" id="intermediate" name="training_level" label="Intermedio" value="Intermediate" onChange={handleChange} required />
                                        <Form.Check type="radio" id="advanced" name="training_level" label="Avanzado" value="Advanced" onChange={handleChange} required />
                                    </div>
                                    <Form.Control.Feedback type="invalid">Por favor, elige un nivel de entrenamiento.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group controlId="training_type">
                                    <Form.Label>Tipo de entrenamiento:</Form.Label>
                                    <Form.Select onChange={handleChange} name='training_type' value={inputs.training_type} required className="w-auto">
                                        <option value="" disabled hidden>Selecciona un tipo de entrenamiento</option>
                                        {currentUser.specializations.map((specialization) => (
                                            <option key={specialization.trainers_specialization.specialization} value={specialization.trainers_specialization.specialization}>{specialization.specialization.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Por favor, elige un tipo de especialización.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="6">
                                <Form.Group controlId="class_name">
                                    <Form.Label>Nombre de la clase:</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre clase" value={inputs.class_name} onChange={handleChange} name="class_name" />
                                    <Form.Control.Feedback type="invalid">Por favor, elige un nombre de clase válido.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group controlId="class_details">
                                    <Form.Label>Detalles clase:</Form.Label>
                                    <Form.Control type="text" placeholder="Detalles" value={inputs.class_details || ""} onChange={handleChange} name="class_details" />
                                    <Form.Control.Feedback type="invalid">Por favor, ingresa detalles válidos para la clase.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </fieldset>

                    <fieldset>
                        <legend>Capacidad y coste</legend>
                        <Row className="mb-3">
                            <Col md="6">
                                <Form.Group controlId="capacity">
                                    <Form.Label>Capacidad alumnos:</Form.Label>
                                    <Form.Control min="1" required type="number" value={inputs.capacity || ""} onChange={handleChange} name="capacity" />
                                    <Form.Control.Feedback type="invalid">Por favor, ingresa una capacidad válida.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group controlId="price">
                                    <Form.Label>Precio:</Form.Label>
                                    <InputGroup>
                                        <Form.Control min="1" required type="number" aria-label="Precio" value={inputs.price || ""} onChange={handleChange} name="price" />
                                        <InputGroup.Text>€</InputGroup.Text>
                                        <Form.Control.Feedback type="invalid">Por favor, ingresa un precio válido.</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    </fieldset>

                    <Row className="mb-3">
                        <Col>
                            {error && <div className="text-danger mt-2">{error}</div>}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="d-flex justify-content-end">
                            <Button type="submit" variant="success" className="me-2">Crear Clase</Button>
                            <Link to={`/trainers/${currentUser.trainer.id}/create/class`} className="btn btn-danger">Volver a mis clases</Link>
                        </Col>
                    </Row>
                    <Toast show={showToast} onClose={() => setShowToast(false)} className="position-fixed top-0 start-50 translate-middle-x m-4" style={{ minWidth: '300px', backgroundColor: '#28a745', color: 'white' }}>
                        <Toast.Header className="d-flex justify-content-center align-items-center" closeButton={false}>
                            <strong>¡Éxito!</strong>
                        </Toast.Header>
                        <Toast.Body className="d-flex justify-content-center align-items-center">
                            Tu clase ha sido grabada correctamente. ¡Felicidades! Ahora puedes seguir gestionando tus clases y alumnos con tranquilidad.
                        </Toast.Body>
                    </Toast>
                </Form>
            ) : (
                <Loading />
            )}
        </Container>
    )
}