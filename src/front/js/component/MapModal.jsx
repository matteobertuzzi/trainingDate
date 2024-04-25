import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Button, Modal } from 'react-bootstrap/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

// Define libraries as a static variable outside the component
const libraries = ['places'];

function MapModal({ addressData }) {
    const [show, setShow] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const { store, actions } = useContext(Context);
    const address = `${addressData[0]} ${addressData[1]}, ${addressData[2]} ${addressData[3]}`;

    useEffect(() => {
        const getGeolocation = async () => {
            await actions.getGeolocation(address);
            setCoordinates(store.currentGeolocation);
        };

        if (show && address) {
            getGeolocation();
        }
    }, [show, address]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Rest of the component remains the same

    const mapContainerStyle = {
        position: 'relative',
        width: '100%',
        height: '300px',
        overflow: 'hidden'
    };
    const center = {
        lat: coordinates ? coordinates.lat : 0,
        lng: coordinates ? coordinates.lng : 0,
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_API_KEY,
        libraries,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <>
            <Button onClick={handleShow} variant="btn btn-outline-primary">
                <FontAwesomeIcon size="2x" icon={faLocationDot} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Dirección de la clase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={10}
                            center={center}
                        >
                            <Marker position={center} />
                        </GoogleMap>
                    </div>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MapModal;
