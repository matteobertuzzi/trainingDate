import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditUserProfile({ user, onChangeSubmit }) {
    const { store, actions } = useContext(Context);
    const { updateUser } = actions;
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({
        city: user.city,
        postal_code: user.postal_code,
        phone_number: user.phone_number
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputs);
        await updateUser(user.id, inputs);
        onChangeSubmit();
        handleClose();
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const changeInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Editar perfil de usuario
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="phone-number">
                            <Form.Label>Número de teléfono</Form.Label>
                            <Form.Control type="number" placeholder={user.phone_number} name='phone_number' value={inputs.phone_number || ""} onChange={changeInputs} />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text" placeholder={user.city} name='city' value={inputs.city || ""} onChange={changeInputs} />
                        </Form.Group>
                        <Form.Group controlId="postal-code">
                            <Form.Label>Código postal</Form.Label>
                            <Form.Control type="number" placeholder={user.postal_code} name='postal_code' value={inputs.postal_code || ""} onChange={changeInputs} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='my-3'>
                            Actualizar datos de usuario
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUserProfile;
