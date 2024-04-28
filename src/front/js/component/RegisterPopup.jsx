import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function RegisterPopup() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <span style={{ textDecoration: 'underline', cursor: 'pointer', color: '#e95420' }} onClick={handleShow}>
                Todas las clases
            </span>

            <Modal show={show} centered='true' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Descubre más Clases</Modal.Title>
                </Modal.Header>
                <Modal.Body>¡Apúntate ahora y descubre todas nuestras clases de entrenamiento disponibles!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Link to='/signup'>
                        <Button variant="primary" onClick={handleClose}>
                            Apuntate Ahora
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RegisterPopup;