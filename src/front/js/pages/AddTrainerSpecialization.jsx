import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button, Col, Form, Row, CloseButton, Toast } from 'react-bootstrap';
import { Context } from "../store/appContext";

export const AddTrainerSpecialization = ({ show, onHide }) => {
    const { store, actions } = useContext(Context)
    const { specializations, currentUser } = store
    const { postTrainerSpecialization } = actions
    const [validated, setValidated] = useState(false);
    const [exited, setExited] = useState(false)
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
            setExited('Certificación enviada con éxito, le llegará un correo con el resultado de la revisión')
            setError(null);
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

    if (!currentUser || !currentUser.trainer) {
        return <Loading />;
    }

    return (
        <Modal show={show} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className="d-flex flex-row justify-content-between align-items-center bg-primary">
                <h4 className="d-felx align-items-center justify-content-center">Especialización</h4>
                <CloseButton onClick={onHide} />
            </Modal.Header>
            <Modal.Body className="d-flex flex-column p-3">
                <Form className="mb-2" noValidate validated={validated} onSubmit={handleSubmit} encType="multipart/form-data">
                    <Row className="g-3">
                        <Form.Group as={Col} md="12" controlId="validationSpecialization">
                            <Form.Label>Selecciona archivo:</Form.Label>
                            <Form.Control
                                required
                                type="file"
                                onChange={handleChange}
                                name="certification"
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, selecciona un archivo de certificación.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="specialization">
                            <Form.Label>Tipo de entrenamiento:</Form.Label>
                            <Form.Select
                                id='specialization'
                                onChange={handleChange}
                                name='specialization_id'
                                value={inputs.specialization_id}
                                required
                            >
                                <option value="" disabled hidden>Selecciona una especialización</option>
                                {specializations.map((specialization, index) => (
                                    <option key={index} value={specialization.id}>
                                        {specialization.name.charAt(0).toUpperCase() + specialization.name.slice(1)}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Por favor, elige un tipo de especialización.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    {error && <div className="text-danger mt-2">{error}</div>}
                    {exited && <div className="text-success mt-2">{exited}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} variant="success">Crear</Button>
                <Button variant="danger" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>

    )
}