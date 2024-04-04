import React from "react";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CloseButton from 'react-bootstrap/CloseButton';
import { Context } from "../store/appContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export const AddTrainerSpecialization = ({ show, onHide }) => {
    const { store, actions } = useContext(Context)
    const { specializations } = store
    const { postTrainerSpecialization } = actions
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams()
    const { trainerId } = params
    const [inputs, setInputs] = useState({
        certification: "",
        specialization_id: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        const postSpecialization = await postTrainerSpecialization(inputs);
        if (!postSpecialization) {
            setError('El entrenador ya tiene esta especialidad confirmada o pendiente de confirmar.')
        } else {
            alert('Los datos han sido enviados, despues las verificaciones recibira la confirmacion de su nueva especilidad.')
            setInputs({
                certification: "",
                specialization_id: ""
            })
            setError(null);
            onHide()
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'specialization_id') {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === 'certification') {
            setInputs((prevState) => ({
                ...prevState,
                certification: files[0]
            }));
        }
    };

    return (
        <Modal show={show} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className="bg-primary">
                <CloseButton onClick={onHide}></CloseButton>
            </Modal.Header>
            <Modal.Body className="w-100 d-flex flex-column p-20">
                <Form className="mb-2" noValidate validated={validated} onSubmit={handleSubmit} encType="multipart/form-data">
                    <Row className="g-3">
                        <Form.Group as={Col} md="12" controlId="validationSpecialization">
                            <Form.Label>Especialización</Form.Label>
                            <Form.Control
                                required
                                type="file"
                                onChange={handleChange}
                                name="certification"
                                className="form-control"
                                aria-describedby="inputGroupFileAddon"
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, selecciona un archivo de certificación.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="specialization">
                            <Form.Label>Tipo de entrenamiento:</Form.Label>
                            <Form.Select
                                id='specialization'
                                onChange={handleChange}
                                name='specialization_id'
                                value={inputs.specialization_id}
                                required
                                className="w-auto"
                            >
                                <option value="">Selecciona una especialización</option>
                                {specializations.map((specialization, index) => (
                                    <option key={index} value={specialization.id}>
                                        {specialization.name.charAt(0).toUpperCase() + specialization.name.slice(1)}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Por favor, elige un tipo de especialización.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    {error && <div className="text-danger mt-2">{error}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} variant="success">Crear</Button>
                <Button variant="danger" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}