import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FilterAlert from './FilterAlert.jsx';
import MapModal from './MapModal.jsx';
import Carousel from 'react-bootstrap/Carousel';

const HomeClassList = ({ filters }) => {
    const { store, actions } = useContext(Context);
    const allClasses = store.allClasses;
    const [showAlert, setShowAlert] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'))
    const isUser = currentUser && currentUser.role === 'users';

    let filteredClasses = allClasses.filter((cls) => {
        return cls.training_type === parseInt(filters.trainingType) && cls.training_level === filters.trainingLevel;
    });

    const updateCart = (newClass) => {
        actions.updateCart(newClass);
    }

    return (
        <>
            {(filteredClasses.length === 0 && filters.trainingType !== '' && filters.trainingLevel !== '') ? <FilterAlert location='classList' showAlert={setShowAlert} /> : <></>}
            {filteredClasses.length > 0 ?
                <Carousel fade style={{ marginTop: '20px' }} >
                    {filteredClasses.map(oneClass => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images.ctfassets.net/qw8ps43tg2ux/268NAl3OLkecJzq6PongwH/2c292c8d2a2fa784f0dea363102080de/iss-personal-trainer-duties-salray-and-more-pt-and-client.jpg"
                                alt={"Class " + oneClass.id}
                                style={{ borderRadius: '15%' }}
                            />
                            <Carousel.Caption>
                                <h3>{oneClass.class_name ? oneClass.class_name : 'Training class'}</h3>
                                <p>{oneClass.class_details ? oneClass.class_details : 'Training class'}</p>
                                {isUser &&
                                    <Button className='mx-3' variant="primary" onClick={() => updateCart(oneClass.id)}>Signup for Class</Button>
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
                                src="https://images.ctfassets.net/qw8ps43tg2ux/268NAl3OLkecJzq6PongwH/2c292c8d2a2fa784f0dea363102080de/iss-personal-trainer-duties-salray-and-more-pt-and-client.jpg"
                                alt={"Class " + oneClass.id}
                                style={{ borderRadius: '15%' }}
                            />
                            <Carousel.Caption>
                                <h3>{oneClass.class_name ? oneClass.class_name : 'Training class'}</h3>
                                <p>{oneClass.class_details ? oneClass.class_details : 'Training class'}</p>
                                {isUser &&
                                    <Button className='mx-3' variant="primary" onClick={() => updateCart(oneClass.id)}>Signup for Class</Button>
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
