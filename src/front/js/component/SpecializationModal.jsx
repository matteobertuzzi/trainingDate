import React from "react"
import { Modal, Button } from 'react-bootstrap/';

export const SpecializationModal = ({ show, onHide, specialization }) => {

    return (
        <Modal className="p-2" centered show={show} >
            <Modal.Header className="d-flex align-items-center justify-content-center bg-primary text-white">
                <h4 className="d-flex align-items-center justify-content-center m-0">{specialization.name.charAt(0).toUpperCase() + specialization.name.slice(1)}</h4>
            </Modal.Header >
            <Modal.Body className="d-flex align-items-center justify-content-center">
                <span>{specialization.description}</span>
            </Modal.Body>
            <Modal.Footer className="d-flex align-items-center justify-content-center">
                <Button variant="outline-secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}