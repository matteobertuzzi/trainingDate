import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import { Button, Card, Carousel } from 'react-bootstrap/';
import FilterAlert from './FilterAlert.jsx';


const AllSpecializations = ({ filters }) => {
    const { store, actions } = useContext(Context);
    const allClasses = store.allClasses;
    const specializations = store.specializations;
    const [showAlert, setShowAlert] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));
    const isUser = currentUser && currentUser.role === 'users';

    const chunkSize = 3;
    const chunkedSpecializations = [];
    for (let i = 0; i < specializations.length; i += chunkSize) {
        chunkedSpecializations.push(specializations.slice(i, i + chunkSize));
    }

    return (
        <>
            {chunkedSpecializations.length > 1 ? (
                <Carousel>
                    {chunkedSpecializations.map((chunk, index) => (
                        <Carousel.Item key={index}>
                            <div className="row">
                                {chunk.map(spec => (
                                    <div className='col-md-4' key={spec.id}>
                                        <Card className='my-3'>
                                            <Card.Img
                                                variant="top"
                                                src="https://images.ctfassets.net/qw8ps43tg2ux/268NAl3OLkecJzq6PongwH/2c292c8d2a2fa784f0dea363102080de/iss-personal-trainer-duties-salray-and-more-pt-and-client.jpg"
                                                style={{ borderRadius: '10%' }}
                                            />
                                            <Card.Body>
                                                <Card.Title>{spec.name}</Card.Title>
                                                <Card.Text>{spec.description}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <div className="row">
                    {specializations.map(spec => (
                        <div className='col-md-4' key={spec.id}>
                            <Card className='my-3'>
                                <Card.Img
                                    variant="top"
                                    src="https://images.ctfassets.net/qw8ps43tg2ux/268NAl3OLkecJzq6PongwH/2c292c8d2a2fa784f0dea363102080de/iss-personal-trainer-duties-salray-and-more-pt-and-client.jpg"
                                    style={{ borderRadius: '10%' }}
                                />
                                <Card.Body>
                                    <Card.Title>{spec.name}</Card.Title>
                                    <Card.Text>{spec.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
            {specializations.length === 0 ?
                <FilterAlert location='classList' showAlert={setShowAlert} />
                : <div></div>
            }
        </>
    )
}

export default AllSpecializations;
