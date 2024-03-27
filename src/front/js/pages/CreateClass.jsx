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


export const CreateClass = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
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
                                />
                                <Form.Control.Feedback type="invalid">Por favor, elige una ciudad.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md="4">
                            <Form.Group controlId="postal_code">
                                <Form.Label>Código Postal:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Código Postal"
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
                                />
                                <Form.Control.Feedback type="invalid">Por favor, elige un nombre de calle.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group controlId="streetNumber">
                                <Form.Label>Número:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Número"
                                />
                                <Form.Control.Feedback type="invalid">Por favor, proporciona un número.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group controlId="additionalInfo">
                                <Form.Label>Información adicional:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Bloque, puerta, piso"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>

                <fieldset>
                    <legend>Información Adicional</legend>
                    <Row className="mb-3">
                        <Col md="6">
                            <Form.Group controlId="startClass">
                                <Form.Label>Inicio clase:</Form.Label>
                                <Form.Control
                                    required
                                    type="datetime-local"
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
                                />
                                <Form.Control.Feedback type="invalid">Por favor, elige una hora válida.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>

                <Row className="mb-3">
                    <Col md="6">
                        <Form.Group controlId="capacity">
                            <Form.Label>Capacidad alumnos:</Form.Label>
                            <Form.Control
                                required
                                type="number"
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
                                />
                                <InputGroup.Text>€</InputGroup.Text>
                                <Form.Control.Feedback type="invalid">Por favor, elige un precio válido.</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <Form.Group controlId="training_level">
                            <Form.Label>Nivel entrenamiento:</Form.Label>
                            <Form.Select aria-label="training_level">
                                <option>Selecciona nivel:</option>
                                <option value="Beginner">Principiante</option>
                                <option value="Intermediate">Intermedio</option>
                                <option value="Advanced">Avanzado</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Por favor, elige un nivel de entrenamiento.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md="6">
                        <Form.Group controlId="training_type">
                            <Form.Label>Tipo entrenamiento:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                            />
                            <Form.Control.Feedback type="invalid">Por favor, elige un tipo de entrenamiento.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit">Enviar</Button>
            </Form>
        </Container>
    )
}