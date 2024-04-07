import React from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function TrainerAlert({ location }) {
    const [show, setShow] = useState(true);

    const handleShowAlert = () => {
        setShow(true);
        showAlert(true);
    }

    return (
        <>
            <Alert show={show} variant="danger">
                <Alert.Heading>My Alert</Alert.Heading>
                {location == 'classes' ?
                    <p>There are no classes. Click the button below to add a new class.</p>
                    :
                    <p>There are no specializations. Click the button below to add a new specialization.</p>}
                <hr />
            </Alert>

            {!show && <Button onClick={() => setShow(true)} variant="outline-danger">Show Alert</Button>}
        </>
    );
}

export default TrainerAlert;