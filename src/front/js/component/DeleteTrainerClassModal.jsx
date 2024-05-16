import React, { useState, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Context } from '../store/appContext';

export const DeleteTrainerClassModal = ({ show, onHide, classId }) => {
    const { store, actions } = useContext(Context)
    const { currentUser } = store
    const { deleteTrainerClass, getTrainerClasses } = actions
    const [deleteError, setDeleteError] = useState(null);

    const handleClick = async () => {
        const delTrainerClass = await deleteTrainerClass(currentUser.trainer.id, classId)
        if (!delTrainerClass) {
            setDeleteError('La clase no se puede cancelar debido a que tiene usuarios apuntados');
        } else {
            await getTrainerClasses();
            onHide();
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-primary text-white" closeButton>
                <Modal.Title>Confirmación cancelación</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column gap-2'>
                <p className="m-0">Recuerda que solo puedes cancelar la clase si no tienes usuarios apuntados.</p>
                <p className="m-0">¿Estás seguro de que deseas cancelar esta clase?</p>
                {deleteError && <div className="text-danger mt-2">{deleteError}</div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Cerrar</Button>
                <Button variant="danger" onClick={handleClick}>Confirmar</Button>
            </Modal.Footer>
        </Modal>
    );
};
