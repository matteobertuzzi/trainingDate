import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Container } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from 'react-bootstrap';


export const CreateClass = () => {
    const [validated, setValidated] = useState(false);
    const { store, actions } = useContext(Context)
    const { specializations, currentUser } = store
    const { postTrainerClasses } = actions
    const params = useParams()
    const { trainerId } = params
    const [loginError, setLoginError] = useState(null);
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
    })

    const handleChange = (e) => {
        e.persist();
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSelect = (eventKey, event) => {
        setInputs((prevState) => ({ ...prevState, training_type: eventKey }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false || inputs.start_date >= inputs.end_date) {
            setValidated(true);
            return;
        }

        setValidated(true);
        const postClass = await postTrainerClasses(inputs);
        if (!postClass) {
            setLoginError('Los datos son incompletos o incorrectos. Por favor, inténtalo de nuevo.');
        } else {
            setInputs({
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
            });
            setLoginError(null);
            alert("¡Clase grabada con éxito!");
        }
    };

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Dirección</legend>
                    <Row className="mb-3">
                        <Col md="4">
                            <Form.Group controlId="city">
                                <Form.Label>Ciudad:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Ciudad"
                                    value={inputs.city || ""}
                                    onChange={handleChange}
                                    name="city"
                                />
                                <Form.Control.Feedback type="invalid">Por favor, elige una ciudad.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md="4">
                            <Form.Group controlId="postal_code">
                                <Form.Label>Código Postal:</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Código Postal"
                                    value={inputs.postal_code || ""}
                                    onChange={handleChange}
                                    name="postal_code"
                                    autoComplete="postal_code"
                                />
                                <Form.Control.Feedback type="invalid">Por favor, elige un código postal.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md="4">
                            <Form.Group controlId="streetName">
                                <Form.Label>Calle:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Calle"
                                    value={inputs.street_name || ""}
                                    onChange={handleChange}
                                    name="street_name"
                                />
                                <Form.Control.Feedback type="invalid">Por favor, elige un nombre de calle.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group controlId="streetNumber">
                                <Form.Label>Número:</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Número"
                                    value={inputs.street_number || ""}
                                    onChange={handleChange}
                                    name="street_number"
                                />
                                <Form.Control.Feedback type="invalid">Por favor, proporciona un número.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group controlId="additionalInfo">
                                <Form.Label>Información adicional:</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    placeholder="Bloque, puerta, piso"
                                    value={inputs.additional_info || ""}
                                    onChange={handleChange}
                                    name="additional_info"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>

                <fieldset>
                    <legend>Horario</legend>
                    <Row className="mb-3">
                        <Col md="6">
                            <Form.Group controlId="startClass">
                                <Form.Label>Inicio clase:</Form.Label>
                                <Form.Control
                                    required
                                    type="datetime-local"
                                    value={inputs.start_date || ""}
                                    onChange={handleChange}
                                    name="start_date"
                                />
                                <Form.Control.Feedback type="invalid">Por favor, elige una hora válida.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group controlId="endClass">
                                <Form.Label>Fin de clase:</Form.Label>
                                <Form.Control
                                    required
                                    type="datetime-local"
                                    value={inputs.end_date || ""}
                                    onChange={handleChange}
                                    name="end_date"
                                />
                                <Form.Control.Feedback type="invalid">Por favor, elige una hora válida.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>

                <fieldset>
                    <legend>Tipo de clase</legend>
                    <Row>
                        <Col md="6">
                            <Form.Group controlId="training_level">
                                <Form.Label>Nivel de entrenamiento:</Form.Label>
                                <div className="d-flex flex-row gap-3">
                                    <Form.Check
                                        type="radio"
                                        id="beginner"
                                        name="training_level"
                                        label="Principiante"
                                        value="Beginner"
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="intermediate"
                                        name="training_level"
                                        label="Intermedio"
                                        value="Intermediate"
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="advanced"
                                        name="training_level"
                                        label="Avanzado"
                                        value="Advanced"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid">Por favor, elige un nivel de entrenamiento.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group controlId="training_type">
                                <Form.Label >Tipo de entrenamiento:</Form.Label>
                                <DropdownButton
                                    variant="primary"
                                    title={inputs.training_type ? inputs.training_type.charAt(0).toUpperCase() + inputs.training_type.slice(1) : "Selecciona una especialización"}
                                    id="training_type"
                                    onSelect={(eventKey, event) => handleSelect(eventKey, event)}
                                >
                                    {specializations.map((specialization, index) => (
                                        <Dropdown.Item key={index} eventKey={specialization.id}>
                                            {specialization.name.charAt(0).toUpperCase() + specialization.name.slice(1)}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                                <Form.Control.Feedback type="invalid">Por favor, elige un tipo de entrenamiento.</Form.Control.Feedback>
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
                                <Form.Control
                                    required
                                    type="number"
                                    value={inputs.capacity || ""}
                                    onChange={handleChange}
                                    name="capacity"
                                />
                                <Form.Control.Feedback type="invalid">Por favor, elige una capacidad.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group controlId="price">
                                <Form.Label>Precio:</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        required
                                        type="number"
                                        aria-label="Precio"
                                        value={inputs.price || ""}
                                        onChange={handleChange}
                                        name="price"
                                    />
                                    <InputGroup.Text>€</InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">Por favor, elige un precio válido.</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
                {loginError && <div className="text-danger mt-2">{loginError}</div>}
                <Button type="submit">Enviar</Button>
            </Form>
        </Container>
    )
}