import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FilterAlert from './FilterAlert.jsx';
import MapModal from './MapModal.jsx';
import Carousel from 'react-bootstrap/Carousel';

const HomeClassList = ({ filters }) => {
    const { store, actions } = useContext(Context);
    const { createCheckoutSession, addCartItem, removeCartItem } = actions;
    const allClasses = store.allClasses;
    const [showAlert, setShowAlert] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const isUser = currentUser && currentUser.role === 'users';


    let filteredClasses = allClasses.filter((cls) => {
        return cls.training_type === parseInt(filters.trainingType) && cls.training_level === filters.trainingLevel;
    });

    return (
        <>
            {(filteredClasses.length === 0 && filters.trainingType !== '' && filters.trainingLevel !== '') ? <FilterAlert location='classList' showAlert={setShowAlert} /> : <></>}
            {filteredClasses.length > 0 ?
                <Carousel fade style={{ marginTop: '20px' }} >
                    {filteredClasses.map(oneClass => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.shape.com/thmb/vMUCGBBuieN6Y5h0bgCqzt0Vf7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fb-interval-training-workouts-c93316d5efe14dee93c6d33ccdb6cd31.jpg"
                                alt={"Clase " + oneClass.id}
                                style={{ borderRadius: '10%' }}
                            />
                            <Carousel.Caption>
                                <h3>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</h3>
                                <p>{oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}</p>
                                {isUser &&
                                    <Button className='mx-3' variant="primary" onClick={() => updateCart(oneClass.id)}>Inscribirse en la clase</Button>
                                }
                                <MapModal className='mx-3' addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                            </Carousel.Caption>
                        </Carousel.Item>

                    ))}
                </Carousel >
                :
                <Carousel fade style={{ marginTop: '20px' }} >
                    {allClasses.map(oneClass => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.shape.com/thmb/vMUCGBBuieN6Y5h0bgCqzt0Vf7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fb-interval-training-workouts-c93316d5efe14dee93c6d33ccdb6cd31.jpg"
                                alt={"Clase " + oneClass.id}
                                style={{ borderRadius: '10%' }}
                            />
                            <Carousel.Caption>
                                <h3>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</h3>
                                <p>{oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}</p>
                                {isUser &&
                                    <Button className='mx-3' variant="primary" onClick={() => updateCart(oneClass.id)}>Inscribirse en la clase</Button>
                                }
                                <MapModal className='mx-3' addressData={[oneClass.city, oneClass.postal_code, oneClass.street_name, oneClass.street_number]} />
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            }
        </>
    )
}

export default HomeClassList;
