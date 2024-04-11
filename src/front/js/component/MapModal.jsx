import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Define libraries as a static variable outside the component
const libraries = ['places'];

function MapModal({ addressData }) {
    const [show, setShow] = useState(false);
    const { store, actions } = useContext(Context);
    let coordinates = store.currentGeolocation;
    const address = `${addressData[0]} ${addressData[1]}, ${addressData[2]} ${addressData[3]} `
    console.log(address);

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        await actions.getGeolocation(address);
        setShow(true);
    }

    useEffect(() => {
        coordinates = store.currentGeolocation;
        console.log(coordinates)
    }, [])

    const mapContainerStyle = {
        position: 'relative',
        width: '100%',
        height: '300px',
        overflow: 'hidden'
    };
    const center = {
        lat: coordinates.lat,
        lng: coordinates.lng,
    };
    console.log(center);

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
            <Button variant="primary" onClick={handleShow}>
            Ver en el mapa
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

