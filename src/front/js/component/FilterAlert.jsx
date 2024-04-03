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
                <Alert.Heading>My Alert</Alert.Heading>
                {location == 'classList' ?
                    <p>There are no classes for the given filters. Here is a list of all available clases.</p>
                    :
                    <p>No booked classes.</p>}
                <hr />
                <div className="d-flex justify-content-center">
                    <Button onClick={() => setShow(false)} variant="outline-danger">
                        Close
                    </Button>
                </div>
            </Alert>

            {!show && <Button onClick={() => setShow(true)} variant="outline-danger">Show Alert</Button>}
        </>
    );
}

export default FilterAlert;