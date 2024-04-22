import React, { useState } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';



function ClassModal({ userClass }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} variant="btn btn-outline-info">
                <FontAwesomeIcon size="2x" icon={faCircleInfo} />
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Detalles clase: {userClass.class_details.class_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup >
                        <ListGroup.Item className='d-flex flex-column'>
                            <span className='d-flex flex-row gap-2'><strong>Capacidad:</strong> {userClass.class_details.capacity} personas</span>
                            <span className='d-flex flex-row gap-2'><strong>Precio:</strong> {userClass.class_details.price / 100} €</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-column'>
                            <span className='d-flex flex-row gap-2'>
                                <strong>Ciudad:</strong> {userClass.class_details.city}
                            </span>
                            <span className='d-flex flex-row gap-2'>
                                <strong>Dirección:</strong> {userClass.class_details.street_name}, {userClass.class_details.street_number}, {userClass.class_details.postal_code}
                            </span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-column'>
                            <span className='d-flex flex-row gap-2'>
                                <strong>Inicio clase:</strong>{" "}
                                {new Date(userClass.class_details.start_date).toLocaleString()}
                            </span>
                            <span className='d-flex flex-row gap-2'>
                                <strong>Fin clase:</strong>{" "}
                                {new Date(userClass.class_details.end_date).toLocaleString()}
                            </span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex flex-column'>
                            <span className='d-flex flex-row gap-2'>
                                <strong>Nivel de entrenamiento:</strong> {userClass.class_details.training_level === 'Beginner' ? 'Principiante' :
                                    userClass.class_details.training_level === 'Intermediate' ? 'Intermedio' : userClass.class_details.training_level === 'Advanced' == "Avanzado"}
                            </span>
                            <span className='d-flex flex-row gap-2'>
                                <strong>Tipo de entrenamiento:</strong> {userClass.specialization.name}
                            </span>
                        </ListGroup.Item>
                    </ListGroup >
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ClassModal;