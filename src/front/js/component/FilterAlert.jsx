import React from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function FilterAlert(onEmptyFilters) {
    const [show, setShow] = useState(false);

    const handleShowAlert = () => {
        setShow(true);
        showAlert(true);
    }

    return (
        <>
            <Alert show={show} variant="danger">
                <Alert.Heading>My Alert</Alert.Heading>
                <p>
                    There are no classes for the given filters. Here is a list of all available clases.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        Close me
                    </Button>
                </div>
            </Alert>

            {!show && <Button onClick={handleShowAlert}>Show Alert</Button>}
        </>
    );
}

export default FilterAlert;