import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditUserProfile({ user }) {
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({
        name: user.name,
        last_name: user.last_name,
        city: user.city,
        postal_code: user.postal_code,
        phone_number: user.phone_number,
        gender: user.gender
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs)
        handleClose(); // Close modal after form submission
    };

    const changeInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })

    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit user profile
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder={user.name} name='name' value={inputs.name} onChange={changeInputs} />
                        </Form.Group>
                        <Form.Group controlId="last-name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder={user.last_name} name='last_name' value={inputs.last_name} onChange={changeInputs} />
                        </Form.Group>
                        <Form.Group controlId="phone-number">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="number" placeholder={user.phone_number} name='phone_number' value={inputs.phone_number} onChange={changeInputs} />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder={user.city} name='city' value={inputs.city} onChange={changeInputs} />
                        </Form.Group>
                        <Form.Group controlId="postal-code">
                            <Form.Label>Postal code</Form.Label>
                            <Form.Control type="text" placeholder={user.postal_code} name='postal_code' value={inputs.postal_code} onChange={changeInputs} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='my-3'>
                            Update user data
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUserProfile;
