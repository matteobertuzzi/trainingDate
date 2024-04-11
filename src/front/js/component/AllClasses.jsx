import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MapModal from './MapModal.jsx';
import Alert from 'react-bootstrap/Alert';
import { IoIosWarning } from "react-icons/io";

const AllClasses = ({ filters }) => {
    const { store, actions } = useContext(Context);
    const allClasses = store.allClasses;
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const isUser = currentUser && currentUser.role === 'users';

    return (
        <>
            <div className="container mt-4">
                <h2 className='text-center my-5'>Clases disponibles</h2>
                <div className="row">
                    {allClasses.length !== 0 ? (
                        allClasses.map((oneClass) => (
                            <div className="col-md-4 mb-4" key={oneClass.id}>
                                <Card>
                                    <Card.Img variant="top" src="https://www.shape.com/thmb/vMUCGBBuieN6Y5h0bgCqzt0Vf7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fb-interval-training-workouts-c93316d5efe14dee93c6d33ccdb6cd31.jpg" />
                                    <Card.Body>
                                        <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                        <Card.Text>{oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}</Card.Text>
                                        <div className='d-flex justify-content-center'>
                                            <MapModal className="mx-3" addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <Alert variant="warning" className="d-flex flex-column justify-content-center align-items-center">
                            <Alert.Heading className="d-flex flex-row align-items-center justify-content-center gap-2"><IoIosWarning />No hay clases disponibles</Alert.Heading>
                            <p>
                                De momento no hay clases disponibles, intentalo más tarde.
                            </p>
                        </Alert>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllClasses;
