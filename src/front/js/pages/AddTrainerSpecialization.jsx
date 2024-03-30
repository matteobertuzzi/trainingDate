import React from "react";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CloseButton from 'react-bootstrap/CloseButton';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export const AddTrainerSpecialization = ({ show, onHide }) => {
    const { store, actions } = useContext(Context)
    const { specializations } = actions
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams()
    const { trainerId } = params
    const [inputs, setInputs] = useState({
        certification: "",
        specialization: ""
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
    };

    const handleChange = (e) => {
        e.persist();
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    return (
        <Modal show={show} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className="bg-primary">
                <CloseButton onClick={onHide}></CloseButton>
            </Modal.Header>
            <Modal.Body className="w-100 d-flex flex-column p-20">
                <Form className="mb-2" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Form.Group as={Col} md="12" controlId="validationSpecialization">
                            <FloatingLabel controlId="validationSpecialization" label="Email address">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="certificacion"
                                    value={inputs.certification}
                                    onChange={handleChange}
                                    name="certification"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a certification.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="training_type">
                            <Form.Label >Tipo de entrenamiento:</Form.Label>
                            <DropdownButton
                                variant="primary"
                                title={inputs.specialization ? inputs.specialization.charAt(0).toUpperCase() + inputs.specialization.slice(1) : "Selecciona una especialización"}
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
                    </Row>
                    {error && <div className="text-danger mt-2">{lerror}</div>}
                </Form>
                <Link to={"/signup/trainer"}>Regístrate</Link>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} variant="success">Log In</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}