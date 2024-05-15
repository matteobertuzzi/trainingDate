import React, { useState, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';


const DeletelUser = ({ show, onHide }) => {
    const { store, actions } = useContext(Context)
    const { currentUser } = store
    const { deleteUser, setLogged } = actions
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate()

    const handleClick = async () => {
        navigate("/")
        await deleteUser(currentUser.user.id)
        if (deleteUser) {
            setLogged(false)
        } else {
            setLoginError('El usuario no se puede cancelar, debido a que tiene clases pendientes');
        }
    }
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-primary text-white" closeButton>
                <Modal.Title>Confirmación de cancelación</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column gap-2'>
                <p className='m-0'>¿Estás seguro de que deseas cancelar tu perfil?</p>
                {loginError && <div className="text-danger mt-2">{loginError}</div>}
            </Modal.Body>
            <Modal.Footer> 
                <Button variant="outline-secondary" onClick={onHide}>Cerrar</Button>
                <Button variant="danger" onClick={handleClick}>Confirmar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeletelUser;