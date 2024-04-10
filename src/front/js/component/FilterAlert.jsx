import React from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function FilterAlert({ location }) {
    const [show, setShow] = useState(true);

    const handleShowAlert = () => {
        setShow(true);
        showAlert(true);
    }

    return (
        <>
            <Alert show={show} variant="danger">
                <Alert.Heading>Alerta</Alert.Heading>
                {location === 'classList' ?
                    <p>No hay clases para los filtros dados. Aquí hay una lista de todas las clases disponibles.</p>
                    :
                    <p>No hay clases reservadas.</p>}
                <hr />
            </Alert>

            {!show && <Button onClick={() => setShow(true)} variant="outline-danger">Mostrar Alerta</Button>}
        </>
    );
}

export default FilterAlert;
