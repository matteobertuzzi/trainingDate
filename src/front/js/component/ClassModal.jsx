import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';



function ClassModal({ userClass }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='d-none d-md-block' variant="primary" onClick={handleShow}>
                Detalles Clase
            </Button>
            <FontAwesomeIcon onClick={handleShow} size="2x" className="d-block d-md-none" icon={faCircleInfo} />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Detalles clase: {userClass.class_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li><strong>Capacidad:</strong> {userClass.capacity}</li>
                        <li><strong>Ciudad:</strong> {userClass.city}</li>
                        <li><strong>Fecha de inicio:</strong> {new Date(userClass.start_date).toLocaleDateString()}</li>
                        <li><strong>Fecha de fin:</strong> {new Date(userClass.end_date).toLocaleDateString()}</li>
                        <li><strong>Dirección:</strong> {userClass.street_name} {userClass.street_number}, {userClass.postal_code}</li>
                        <li><strong>Precio:</strong> {userClass.price / 100} €</li>
                        <li><strong>Nivel de entrenamiento:</strong> {userClass.training_level === 'Beginner' ? 'Principiante' :
                            userClass.training_level === 'Intermediate' ? 'Intermedio' : userClass.training_level}</li>
                        <li><strong>Tipo de entrenamiento:</strong> {userClass.training_type === 1 ? 'Individual' : 'Grupal'}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ClassModal;