import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function RegisterPopup({ show, onHide }) {

    return (
        <Modal show={show} centered='true' onHide={onHide}>
            <Modal.Header className='bg-primary text-white' closeButton>
                <Modal.Title>Descubre más Clases</Modal.Title>
            </Modal.Header>
            <Modal.Body>¡Apúntate ahora y descubre todas nuestras clases de entrenamiento disponibles!</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>
                    Cerrar
                </Button>
                <Link to='/signup'>
                    <Button variant="primary" onClick={onHide}>
                        Apuntate Ahora
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
}

export default RegisterPopup;