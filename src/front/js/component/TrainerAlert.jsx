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
                <Alert.Heading>Alerta</Alert.Heading>
                {location === 'classes' ?
                    <p>No hay clases. Haz clic en el botón de abajo para agregar una nueva clase.</p>
                    :
                    <p>No hay especializaciones. Haz clic en el botón de abajo para agregar una nueva especialización.</p>}
                <hr />
            </Alert>

            {!show && <Button onClick={() => setShow(true)} variant="outline-danger">Mostrar Alerta</Button>}
        </>
    );
}

export default TrainerAlert;
