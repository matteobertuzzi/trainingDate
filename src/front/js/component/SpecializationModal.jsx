import React, { useContext } from "react"
import { Context } from '../store/appContext';
import { Modal, Button } from 'react-bootstrap/';

export const SpecializationModal = ({ show, onHide, specialization }) => {
    const { store, actions } = useContext(Context)
    const { specializations } = store

    return (
        <Modal className="p-2" centered show={show}>
            <Modal.Header className="d-flex align-items-center justify-content-center">
                <h4 className="d-flex align-items-center justify-content-center mb-0">{specialization.name.charAt(0).toUpperCase() + specialization.name.slice(1)}</h4>
            </Modal.Header >
            <Modal.Body className="d-flex align-items-center justify-content-center">
                <span>{specialization.description}</span>
            </Modal.Body>
            <Modal.Footer className="d-flex align-items-center justify-content-center">
                <Button variant="danger" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}